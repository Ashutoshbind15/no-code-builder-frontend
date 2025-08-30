
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
    ],
    // HTML Elements - basic styling props
    "div": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "main": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "section": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "article": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "header": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "footer": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "aside": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "nav": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "form": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        },
        {
            category: "behavior",
            props: [
                { name: "action", type: "string", defaultValue: "" },
                { name: "method", type: "string", defaultValue: "get" }
            ]
        }
    ],
    "ul": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "ol": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "li": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "table": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "tbody": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "tr": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "td": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "th": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        }
    ],
    "button": [
        {
            category: "styling",
            props: [
                { name: "className", type: "string", defaultValue: "" },
                { name: "id", type: "string", defaultValue: "" }
            ]
        },
        {
            category: "behavior",
            props: [
                { name: "type", type: "string", defaultValue: "button" },
                { name: "disabled", type: "boolean", defaultValue: false }
            ]
        },
        {
            category: "content",
            props: [
                { name: "children", type: "string", defaultValue: "Button" }
            ]
        }
    ]
}

// Component children metadata
const componentChildrenMetadata = {
    "PageWrapper": true,
    "Card": false,
    "Text": false,
    "Container": true,
    "div": true,
    "main": true,
    "section": true,
    "article": true,
    "header": true,
    "footer": true,
    "aside": true,
    "nav": true,
    "form": true,
    "ul": true,
    "ol": true,
    "li": true,
    "table": true,
    "tbody": true,
    "tr": true,
    "td": true,
    "th": true,
    "button": true
}

export const customNamesToComponentRegistry = {
    "Card": Card,
    "Container": Container,
    "Text": Text,
    "PageWrapper": PageWrapper
}

// Helper function to get flat default props for HTML elements
export const getDefaultsForHtmlElements = (elementName) => {
    const metadata = propMetadata[elementName]
    if (!metadata) return {}

    const flatDefaults = {}
    metadata.forEach(category => {
        if (category.props) {
            category.props.forEach(prop => {
                flatDefaults[prop.name] = prop.defaultValue
            })
        }
    })
    return flatDefaults
}

// Helper function to check if a component is a custom component (non-HTML)
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