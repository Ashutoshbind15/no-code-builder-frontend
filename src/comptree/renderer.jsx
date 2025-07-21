import { useEffect } from "react";
import { starterState, userDefComps } from "./state";
import { useStateStore } from "./statestore";

const higherOrderEffectCreator = (effectCreatorProps) => {
    return () => {
        // logging the effect creator props (test hof)
        console.log(effectCreatorProps);
    }
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
const resolveProps = (props, parentProps, getState) => {

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

const getActionProps = (actions, setState, getState) => {
    const res = {}
    if (!actions) {
        return res;
    }
    for (let action of actions) {
        if (action.trigger === "onClick") {
            res["onClick"] = higherOrderActionCreator(action, setState, getState)
        }
    }
    return res;
}

// todo: track ids
export const Renderer = ({ node, props }) => {
    const { getState, setState } = useStateStore()

    if (node.type === "stringLiteral") {
        return <>
            {props.text}
        </>;
    }

    let jsx = null;

    if (!isUserDefElement(node)) {

        const extraProps = getActionProps(node.actions, setState, getState)

        jsx = (
            <node.type {...props} {...extraProps}>
                {node.children && node.children.map((child) => (
                    <Renderer key={child.id} node={child} props={resolveProps(child.props, props, getState)} />
                ))}
            </node.type>
        )
    } else {
        const customNodeType = node.type.split(':')[1]
        const customNodeMetadata = userDefComps[customNodeType]
        const customNodeBody = customNodeMetadata.body

        if (!customNodeMetadata.takesChildren) {
            jsx = (
                <>
                    {customNodeBody.map((bodyNode) => (
                        <Renderer key={bodyNode.id} node={bodyNode} props={resolveProps(bodyNode.props, props, getState)} />
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
                                        <Renderer key={child.id} node={child} props={resolveProps(child.props, props, getState)} />
                                    ))}
                                </>
                            )
                        } else {
                            return (
                                <Renderer key={bodyNode.id} node={bodyNode} props={resolveProps(bodyNode.props, props, getState)} />
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