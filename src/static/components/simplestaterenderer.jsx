import React from "react"
import { useAtomValue } from 'jotai'
import { componentTakesChildren, customNamesToComponentRegistry } from "../../predefcomps/metadata"
import { nodeAtomFamily, nodePropsAtomFamily } from "../atoms"

// Optimized renderer using Jotai atoms - only re-renders when specific node data changes
const SimpleRenderer = ({ nodeId }) => {
    const node = useAtomValue(nodeAtomFamily(nodeId))
    const categorizedProps = useAtomValue(nodePropsAtomFamily(nodeId))

    // console.log("nodeId", nodeId)

    const CustomComponent = customNamesToComponentRegistry[node.componentType]

    if (!CustomComponent) {
        console.warn(`Custom component not found: ${node.componentType}`)
        return null
    }

    const takesChildren = componentTakesChildren(node.componentType)

    // Spread the categorized props directly (e.g., content={...}, containerStyles={...})
    if (takesChildren) {
        return (
            <CustomComponent {...categorizedProps}>
                {node.children?.map((childId) => (
                    <SimpleRenderer key={childId} nodeId={childId} />
                ))}
            </CustomComponent>
        )
    } else {
        return <CustomComponent {...categorizedProps} />
    }
}

export default SimpleRenderer;