import React from "react"
import { Card } from "../../predefcomps/Card"
import { Container } from "../../predefcomps/Container"
import { Text } from "../../predefcomps/Text"
import PageWrapper from "../../predefcomps/PageWrapper"

const resolveProps = (nodeId, evalsState) => {
    const nodeEvalState = evalsState[nodeId]
    if (!nodeEvalState) {
        // wont have for literals
        return {}
    }
    return nodeEvalState.props
}

const htmlomponentsThatCanTakeChildren = ["div", "main", "section", "article", "header", "footer", "aside", "nav", "form", "ul", "ol", "li", "table", "tbody", "tr", "td", "th", "button"]

const customNamesToComponentRegistry = {
    "Card": Card,
    "Container": Container,
    "Text": Text,
    "PageWrapper": PageWrapper
}

const customComponentToTakesChildrenMapping = {
    "Card": false,
    "Container": true,
    "Text": false,
    "PageWrapper": true
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
        const takesChildren = htmlomponentsThatCanTakeChildren.includes(nodeType)

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

        const takesChildren = customComponentToTakesChildrenMapping[customNodeType]
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