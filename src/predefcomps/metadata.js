
import { Card } from './Card'
import { Container } from './Container'
import { Text } from './Text'
import PageWrapper from './PageWrapper'

const propMetadata = {
    "PageWrapper": [
        {
            category: "background",
            props: [{
                name: "backgroundColor",
                type: "string",
                defaultValue: "#ffffff"
            }, {
                name: "backgroundImage",
                type: "string",
                defaultValue: null
            }, {
                name: "backgroundGradient",
                type: "string",
                defaultValue: null
            }, {
                name: "backgroundPosition",
                type: "string",
                defaultValue: "center"
            }, {
                name: "backgroundSize",
                type: "string",
                defaultValue: "cover"
            }, {
                name: "backgroundRepeat",
                type: "string",
                defaultValue: "no-repeat"
            }]
        },
        {
            category: "layout",
            props: [{
                name: "maxWidth",
                type: "string",
                defaultValue: "1200px"
            }, {
                name: "minHeight",
                type: "string",
                defaultValue: "100vh"
            }, {
                name: "padding",
                type: "string",
                defaultValue: "20px"
            }, {
                name: "paddingTop",
                type: "string",
                defaultValue: null
            }, {
                name: "paddingBottom",
                type: "string",
                defaultValue: null
            }, {
                name: "paddingLeft",
                type: "string",
                defaultValue: null
            }, {
                name: "paddingRight",
                type: "string",
                defaultValue: null
            }, {
                name: "centered",
                type: "boolean",
                defaultValue: true
            }]
        },
        {
            category: "spacing",
            props: [{
                name: "marginTop",
                type: "string",
                defaultValue: "0px"
            }, {
                name: "marginBottom",
                type: "string",
                defaultValue: "0px"
            }]
        }
    ],
    "Card": [
        {
            category: "content",
            props: [{
                name: "title",
                type: "string",
                defaultValue: "Hello"
            }, {
                name: "description",
                type: "string",
                defaultValue: "This is a description"
            }, {
                name: "image1",
                type: "string",
                defaultValue: "https://example.com/images/150"
            }]
        },
        {
            category: "containerStyles",
            props: [{
                name: "backgroundColor",
                type: "string",
                defaultValue: "#ffffff"
            }, {
                name: "borderRadius",
                type: "string",
                defaultValue: "10px"
            }, {
                name: "padding",
                type: "string",
                defaultValue: "20px"
            }, {
                name: "margin",
                type: "string",
                defaultValue: "20px"
            }, {
                name: "boxShadow",
                type: "string",
                defaultValue: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
            }, {
                name: "border",
                type: "string",
                defaultValue: "1px solid #e0e0e0"
            }, {
                name: "opacity",
                type: "number",
                defaultValue: 1
            }, {
                name: "visible",
                type: "boolean",
                defaultValue: true
            }]
        }
    ],
    "Text": [
        {
            category: "content",
            props: [{
                name: "text",
                type: "string",
                defaultValue: "Sample text"
            }]
        },
        {
            category: "styling",
            props: [{
                name: "className",
                type: "string",
                defaultValue: "text-sm text-gray-500"
            }, {
                name: "fontSize",
                type: "number",
                defaultValue: 16
            }, {
                name: "bold",
                type: "boolean",
                defaultValue: false
            }, {
                name: "italic",
                type: "boolean",
                defaultValue: false
            }]
        }
    ],
    "Container": [
        {
            category: "styling",
            props: [{
                name: "className",
                type: "string",
                defaultValue: "bg-red-500"
            }]
        }
    ]
}

// Component children metadata - only custom components
const componentChildrenMetadata = {
    "PageWrapper": true,
    "Card": false,
    "Text": false,
    "Container": true
}

export const customNamesToComponentRegistry = {
    "Card": Card,
    "Container": Container,
    "Text": Text,
    "PageWrapper": PageWrapper
}



// All components are now custom components
export const isCustomComponent = (componentName) => {
    return ['Card', 'Container', 'Text', 'PageWrapper'].includes(componentName)
}

// Helper function to get categorized default props for custom components
export const getCategorizedDefaultProps = (componentName) => {
    const metadata = propMetadata[componentName]
    if (!metadata) return {}

    const categorizedDefaults = {}
    metadata.forEach(category => {
        if (category.props) {
            categorizedDefaults[category.category] = {}
            category.props.forEach(prop => {
                categorizedDefaults[category.category][prop.name] = prop.defaultValue
            })
        }
    })
    return categorizedDefaults
}

// Helper function to get categorized props for a component
export const getCategorizedProps = (componentName) => {
    return propMetadata[componentName] || []
}

// Helper function to check if component takes children
export const componentTakesChildren = (componentName) => {
    return componentChildrenMetadata[componentName] || false
}

export { propMetadata, componentChildrenMetadata }
export default propMetadata;