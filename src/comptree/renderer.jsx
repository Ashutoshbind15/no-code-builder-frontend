import { useEffect } from "react";
import { starterState, userDefComps } from "./state";

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


// todo: also account for the default values
const resolveProps = (props, parentProps, parentState, node) => {

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
            res[prop.name] = parentState[propName];
        }
        else {
            res[prop.name] = prop.value;
        }
    }

    if (node.id === "card-title-text") {
        console.log("props", res)
        console.log("parentProps", parentProps)
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

    console.log("current node", node)
    console.log("current props", props)


    if (node.type === "stringLiteral") {
        return <>
            {props.text}
        </>;
    }

    if (!isUserDefElement(node)) {
        return (
            <node.type {...props}>
                {node.children && node.children.map((child) => (
                    <Renderer key={child.id} node={child} props={resolveProps(child.props, props, node.state, child)} />
                ))}
            </node.type>
        )
    }


    // custom nodes now
    const customNodeType = node.type.split(':')[1]
    const customNodeMetadata = userDefComps[customNodeType]
    const customNodeBody = customNodeMetadata.body

    console.log("custom node metadata", customNodeMetadata)
    console.log("custom node body", customNodeBody)

    if (!customNodeMetadata.takesChildren) {
        return (
            <>
                {customNodeBody.map((bodyNode) => (
                    <Renderer key={bodyNode.id} node={bodyNode} props={resolveProps(bodyNode.props, props, node.state, bodyNode)} />
                ))}
            </>
        )
    } else {
        return (
            <>
                {customNodeBody.map((bodyNode) => {
                    if (bodyNode.type === "children") {
                        return (
                            <>
                                {node.children.map((child) => (
                                    <Renderer key={child.id} node={child} props={resolveProps(child.props, props, node.state, child)} />
                                ))}
                            </>
                        )
                    } else {
                        return (
                            <Renderer key={bodyNode.id} node={bodyNode} props={resolveProps(bodyNode.props, props, node.state, bodyNode)} />
                        )
                    }
                })}
            </>
        )
    }
}