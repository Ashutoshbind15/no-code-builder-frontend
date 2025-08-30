import React from "react"
import { Card } from "../predefcomps/Card"
import { Container } from "../predefcomps/Container"
import { Text } from "../predefcomps/Text"
import { treeSampleEvalState } from "../static/components/simplestate"
import DraggableNodeWrapper from "./DraggableNodeWrapper"

const resolveProps = (nodeId) => {
    const nodeEvalState = treeSampleEvalState[nodeId]
    if (!nodeEvalState) {
        return {}
    }
    return nodeEvalState.props
}



const customNamesToComponentRegistry = {
    "Card": Card,
    "Container": Container,
    "Text": Text
}

const customComponentToTakesChildrenMapping = {
    "Card": false,
    "Container": true,
    "Text": false
}

const canTakeChildren = (nodeId) => {
    // All components are now custom components (format: "ComponentType:id")
    const customNodeType = nodeId.split(":")[0]
    return customComponentToTakesChildrenMapping[customNodeType] || false
}

const DnDRenderer = ({ node, treeState, setTreeState }) => {
    const nodeId = node.id
    const categorizedProps = resolveProps(nodeId)
    const takesChildren = canTakeChildren(nodeId)

    // Extract component type from nodeId (format: "ComponentType:id")
    const customNodeType = nodeId.split(":")[0]
    const CustomComponent = customNamesToComponentRegistry[customNodeType]
    let renderedComponent

    if (CustomComponent) {
        if (takesChildren) {
            renderedComponent = (
                <CustomComponent {...categorizedProps}>
                    {node.children?.map((child) => (
                        <DnDRenderer key={child.id} node={child} treeState={treeState} setTreeState={setTreeState} />
                    ))}
                </CustomComponent>
            )
        } else {
            renderedComponent = <CustomComponent {...categorizedProps} />
        }
    } else {
        console.warn(`Custom component not found: ${customNodeType}`)
        renderedComponent = null
    }

    // Wrap in draggable container
    return (
        <DraggableNodeWrapper nodeId={nodeId} treeState={treeState} setTreeState={setTreeState} canTakeChildren={takesChildren}>
            {renderedComponent}
        </DraggableNodeWrapper>
    )
}

export default DnDRenderer
