import React from "react"
import { componentTakesChildren, customNamesToComponentRegistry } from "../../predefcomps/metadata"

const resolveProps = (nodeId, evalsState) => {
    const nodeEvalState = evalsState[nodeId]
    if (!nodeEvalState) {
        return {}
    }
    return nodeEvalState.props
}

// Simplified renderer for custom components only

const SimpleRenderer = ({ node, evalsState }) => {
    const nodeId = node.id
    const categorizedProps = resolveProps(nodeId, evalsState)

    // Extract component type from nodeId (format: "ComponentType:id")
    const customNodeType = nodeId.split(":")[0]
    const CustomComponent = customNamesToComponentRegistry[customNodeType]

    if (!CustomComponent) {
        console.warn(`Custom component not found: ${customNodeType}`)
        return null
    }

    const takesChildren = componentTakesChildren(customNodeType)

    // Spread the categorized props directly (e.g., content={...}, containerStyles={...})
    if (takesChildren) {
        return (
            <CustomComponent {...categorizedProps}>
                {node.children?.map((child) => (
                    <SimpleRenderer key={child.id} node={child} evalsState={evalsState} />
                ))}
            </CustomComponent>
        )
    } else {
        return <CustomComponent {...categorizedProps} />
    }
}

export default SimpleRenderer;