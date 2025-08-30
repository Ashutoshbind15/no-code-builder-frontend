import React from "react"
import { componentTakesChildren, customNamesToComponentRegistry } from "../../predefcomps/metadata"

const resolveProps = (nodeId, evalsState) => {
    const nodeEvalState = evalsState[nodeId]
    if (!nodeEvalState) {
        // wont have for literals
        return {}
    }
    return nodeEvalState.props
}

// For now we using the React.createElement approach, 
// consider the cutomrenderernew, for other impl, if we somehow dont want
// to use the React.createElement approach

const SimpleRenderer = ({ node, evalsState, literalValues }) => {
    const nodeId = node.id;
    const nodeProps = resolveProps(nodeId, evalsState)
    const isCustomComponent = node.id.startsWith("p:")

    if (!isCustomComponent) {
        const nodeType = nodeId.split(":")[0]
        const takesChildren = componentTakesChildren(nodeType)

        if (takesChildren) {
            return React.createElement(
                nodeType,
                nodeProps,
                node.children.map((child) => (
                    <SimpleRenderer key={child.id} node={child} evalsState={evalsState} literalValues={literalValues} />
                ))
            )
        } else {
            return React.createElement(nodeType, nodeProps)
        }
    } else {
        const customNodeType = nodeId.split(":")[1]
        const CustomComponent = customNamesToComponentRegistry[customNodeType]
        const isLiteral = nodeId.startsWith("p:Literal:")

        if (isLiteral) {
            return <>{literalValues[nodeId]}</>
        }

        if (!CustomComponent) {
            return null
        }

        const takesChildren = componentTakesChildren(customNodeType)
        if (takesChildren) {
            return <CustomComponent {...nodeProps}>
                {node.children.map((child) => (
                    <SimpleRenderer key={child.id} node={child} evalsState={evalsState} literalValues={literalValues} />
                ))}
            </CustomComponent>
        } else {
            return <CustomComponent {...nodeProps} />
        }

    }
}

export default SimpleRenderer;