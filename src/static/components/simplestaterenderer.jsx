import React, { memo } from "react"
import { useAtomValue } from 'jotai'
import { componentTakesChildren, customNamesToComponentRegistry } from "../../predefcomps/metadata"
import { nodeAtomFamily, nodePropsAtomFamily } from "../atoms"
import NodeWrappers from "./NodeWrappers"
import EventWrapper from "./EventWrapper"

// Optimized renderer using Jotai atoms - only re-renders when specific node data changes
const SimpleRenderer = memo(({ nodeId }) => {
    const node = useAtomValue(nodeAtomFamily(nodeId))
    const categorizedProps = useAtomValue(nodePropsAtomFamily(nodeId))

    // todo: [high]
    // though the state of a parent node changes, nodeWrappers in this case, the internal renderer dont re-render, find reason

    // answer: likely due to the parent node not changing the children being rendered, so it's internally optimized..
    // the statement saying that when a parent re-renders, the children are also re-rendered, is a simplification...
    console.log("nodeId", nodeId)

    const CustomComponent = customNamesToComponentRegistry[node.componentType]

    if (!CustomComponent) {
        console.warn(`Custom component not found: ${node.componentType}`)
        return null
    }

    const takesChildren = componentTakesChildren(node.componentType)

    // Spread the categorized props directly (e.g., content={...}, containerStyles={...})
    // noice, as here the composition pattern applies, no memo needed for the wrappers
    if (takesChildren) {
        return (
            <NodeWrappers nodeId={nodeId}>
                <EventWrapper nodeId={nodeId}>
                    <CustomComponent {...categorizedProps}>
                        {node.children?.map((childId) => (
                            <SimpleRenderer key={childId} nodeId={childId} />
                        ))}
                    </CustomComponent>
                </EventWrapper>
            </NodeWrappers>
        )
    } else {
        return (
            <NodeWrappers nodeId={nodeId}>
                <EventWrapper nodeId={nodeId}>
                    <CustomComponent {...categorizedProps} />
                </EventWrapper>
            </NodeWrappers>
        )
    }
})

export default SimpleRenderer;