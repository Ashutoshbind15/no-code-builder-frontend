import React, { useState } from "react"
import { Card } from "../predefcomps/Card"
import { Container } from "../predefcomps/Container"
import { Text } from "../predefcomps/Text"
import { literalValuesSampleState, treeSampleEvalState } from "./simplestate"
import DraggableNodeWrapper from "./DraggableNodeWrapper"

const resolveProps = (nodeId) => {
    const nodeEvalState = treeSampleEvalState[nodeId]
    if (!nodeEvalState) {
        return {}
    }
    return nodeEvalState.props
}

const htmlComponentsThatCanTakeChildren = ["div", "main", "section", "article",
    "header", "footer", "aside", "nav", "form", "ul", "ol",
    "li", "table", "tbody", "tr", "td", "th", "button"]

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
    const isCustomComponent = nodeId.startsWith("p:")
    if (!isCustomComponent) {
        const nodeType = nodeId.split(":")[0]
        return htmlComponentsThatCanTakeChildren.includes(nodeType)
    } else {
        const customNodeType = nodeId.split(":")[1]
        return customComponentToTakesChildrenMapping[customNodeType] || false
    }
}

const DnDRenderer = ({ node, treeState, setTreeState }) => {
    const nodeId = node.id
    const nodeProps = resolveProps(nodeId)
    const isCustomComponent = nodeId.startsWith("p:")
    const takesChildren = canTakeChildren(nodeId)
    let renderedComponent

    if (!isCustomComponent) {
        const nodeType = nodeId.split(":")[0]

        if (takesChildren) {
            renderedComponent = React.createElement(
                nodeType,
                nodeProps,
                node.children?.map((child) => (
                    <DnDRenderer key={child.id} node={child} treeState={treeState} setTreeState={setTreeState} />
                ))
            )
        } else {
            renderedComponent = React.createElement(nodeType, nodeProps)
        }
    } else {
        const customNodeType = nodeId.split(":")[1]
        const CustomComponent = customNamesToComponentRegistry[customNodeType]
        const isLiteral = nodeId.startsWith("p:Literal:")

        if (isLiteral) {
            renderedComponent = <>{literalValuesSampleState[nodeId]}</>
        } else if (CustomComponent) {
            if (takesChildren) {
                renderedComponent = <CustomComponent {...nodeProps}>
                    {node.children?.map((child) => (
                        <DnDRenderer key={child.id} node={child} treeState={treeState} setTreeState={setTreeState} />
                    ))}
                </CustomComponent>
            } else {
                renderedComponent = <CustomComponent {...nodeProps} />
            }
        } else {
            renderedComponent = null
        }
    }

    // Wrap in draggable container
    return (
        <DraggableNodeWrapper nodeId={nodeId} treeState={treeState} setTreeState={setTreeState} canTakeChildren={takesChildren}>
            {renderedComponent}
        </DraggableNodeWrapper>
    )
}

export default DnDRenderer
