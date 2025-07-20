import { useEffect } from "react";
import { starterState, userDefComps } from "./state";
import { useStateStore } from "./statestore";

const higherOrderEffectCreator = (effectCreatorProps) => {
    return () => {
        // logging the effect creator props (test hof)
        console.log(effectCreatorProps);
    }
}

const EffectWrapper = ({ dependencies, effectCreatorProps }) => {
    useEffect(() => {
        higherOrderEffectCreator(effectCreatorProps)
    }, [
        ...dependencies,
    ])
}

const isUserDefElement = (node) => {
    if (node.type.startsWith('userdef:')) {
        return true;
    }
    return false;
}

const higherOrderActionCreator = (action, setState, getState) => {
    if (action.actionParams?.length > 0) {
        const [actionType, ...actionParams] = action.actionParams
        if (actionType === "mutatestate") {
            return () => {
                if (actionParams[1] === "inc") {
                    setState(actionParams[0], getState(actionParams[0]) + 1)
                } else if (actionParams[1] === "dec") {
                    setState(actionParams[0], getState(actionParams[0]) - 1)
                }
            }
        }
    } else {
        return () => { }
    }
}


// todo: also account for the default values
const resolveProps = (props, parentProps, node, getState, setState) => {

    const res = {}

    // if(node.type.startsWith('userdef:')) {
    //     const defaultProps = 

    // }

    for (let prop of props) {
        if (prop.value.startsWith('prop:')) {
            const propName = prop.value.split(':')[1];
            res[prop.name] = parentProps[propName];
        }
        // todo: get this right to support the global state
        else if (prop.value.startsWith('state:')) {
            const propName = prop.value.split(':')[1];
            res[prop.name] = getState(propName);
        }
        else {
            res[prop.name] = prop.value;
        }
    }

    return res;
}

// todo: track ids
export const Renderer = ({ node, props }) => {

    // if (node.effects.length > 0) {
    //     return (
    //         <EffectWrapper dependencies={node.effects} effectCreatorProps={node.effects} >
    //             {/* implement/copy the render logic in here */}
    //         </EffectWrapper>
    //     )
    // }

    const { getState, setState } = useStateStore()
    const ctrState = getState("ctrval")

    // console.log("current node", node)
    // console.log("current props", props)

    if (node.type === "stringLiteral") {
        return <>
            {props.text}
        </>;
    }

    let jsx = null;

    if (!isUserDefElement(node)) {

        const extraProps = {}

        if (node.actions?.length > 0) {
            // console.log("node.actions", node.actions)
            for (let action of node.actions) {
                if (action.trigger === "onClick") {
                    extraProps["onClick"] = higherOrderActionCreator(action, setState, getState)
                }
            }
        }

        jsx = (
            <node.type {...props} {...extraProps}>
                {node.children && node.children.map((child) => (
                    <Renderer key={child.id} node={child} props={resolveProps(child.props, props, child, getState, setState)} />
                ))}
            </node.type>
        )
    } else {
        const customNodeType = node.type.split(':')[1]
        const customNodeMetadata = userDefComps[customNodeType]
        const customNodeBody = customNodeMetadata.body

        // console.log("custom node metadata", customNodeMetadata)
        // console.log("custom node body", customNodeBody)

        if (!customNodeMetadata.takesChildren) {
            jsx = (
                <>
                    {customNodeBody.map((bodyNode) => (
                        <Renderer key={bodyNode.id} node={bodyNode} props={resolveProps(bodyNode.props, props, bodyNode, getState, setState)} />
                    ))}
                </>
            )
        } else {
            jsx = (
                <>
                    {customNodeBody.map((bodyNode) => {
                        if (bodyNode.type === "children") {
                            return (
                                <>
                                    {node.children.map((child) => (
                                        <Renderer key={child.id} node={child} props={resolveProps(child.props, props, child, getState, setState)} />
                                    ))}
                                </>
                            )
                        } else {
                            return (
                                <Renderer key={bodyNode.id} node={bodyNode} props={resolveProps(bodyNode.props, props, bodyNode, getState, setState)} />
                            )
                        }
                    })}
                </>
            )
        }
    }



    if (node.id === "card-description") {
        return (
            <TmpEffectWrapper depArray={[props.text]}>
                {jsx}
            </TmpEffectWrapper>
        )
    }


    return jsx;
}

const TmpEffectWrapper = ({ children, depArray = [] }) => {

    useEffect(() => {
        console.log("tmp effect wrapper")
    }, [...depArray])

    return (
        <div>
            {children}
        </div>
    )
}