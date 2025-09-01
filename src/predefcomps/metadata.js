
import { Card } from './Card'
import { Container } from './Container'
import { Text } from './Text'
import PageWrapper from './PageWrapper'
import { Layout } from './Layout'
import { Image } from './Image'
import { Video } from './Video'
import { Link } from './Link'

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
                name: "fontWeight",
                type: "string",
                defaultValue: "normal",
                options: [
                    { label: "Normal", value: "normal" },
                    { label: "Bold", value: "bold" },
                    { label: "Light", value: "300" },
                    { label: "Medium", value: "500" },
                    { label: "Semi Bold", value: "600" },
                    { label: "Extra Bold", value: "800" }
                ]
            }, {
                name: "fontStyle",
                type: "string",
                defaultValue: "normal",
                options: [
                    { label: "Normal", value: "normal" },
                    { label: "Italic", value: "italic" }
                ]
            }, {
                name: "color",
                type: "color",
                defaultValue: "#000000"
            }, {
                name: "textAlign",
                type: "string",
                defaultValue: "left",
                options: [
                    { label: "Left", value: "left" },
                    { label: "Center", value: "center" },
                    { label: "Right", value: "right" },
                    { label: "Justify", value: "justify" }
                ]
            }, {
                name: "lineHeight",
                type: "string",
                defaultValue: "1.5"
            }, {
                name: "letterSpacing",
                type: "string",
                defaultValue: "normal"
            }, {
                name: "textDecoration",
                type: "string",
                defaultValue: "none",
                options: [
                    { label: "None", value: "none" },
                    { label: "Underline", value: "underline" },
                    { label: "Line Through", value: "line-through" },
                    { label: "Overline", value: "overline" }
                ]
            }, {
                name: "textTransform",
                type: "string",
                defaultValue: "none",
                options: [
                    { label: "None", value: "none" },
                    { label: "Uppercase", value: "uppercase" },
                    { label: "Lowercase", value: "lowercase" },
                    { label: "Capitalize", value: "capitalize" }
                ]
            }, {
                name: "element",
                type: "string",
                defaultValue: "p",
                options: [
                    { label: "Paragraph", value: "p" },
                    { label: "Heading 1", value: "h1" },
                    { label: "Heading 2", value: "h2" },
                    { label: "Heading 3", value: "h3" },
                    { label: "Heading 4", value: "h4" },
                    { label: "Heading 5", value: "h5" },
                    { label: "Heading 6", value: "h6" },
                    { label: "Span", value: "span" },
                    { label: "Div", value: "div" }
                ]
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
    "Layout": [
        {
            category: "layout",
            props: [{
                name: "direction",
                type: "string",
                defaultValue: "row",
                options: [
                    { label: "Row", value: "row" },
                    { label: "Column", value: "column" },
                    { label: "Row Reverse", value: "row-reverse" },
                    { label: "Column Reverse", value: "column-reverse" }
                ]
            }, {
                name: "justifyContent",
                type: "string",
                defaultValue: "flex-start",
                options: [
                    { label: "Start", value: "flex-start" },
                    { label: "Center", value: "center" },
                    { label: "End", value: "flex-end" },
                    { label: "Space Between", value: "space-between" },
                    { label: "Space Around", value: "space-around" },
                    { label: "Space Evenly", value: "space-evenly" }
                ]
            }, {
                name: "alignItems",
                type: "string",
                defaultValue: "stretch",
                options: [
                    { label: "Stretch", value: "stretch" },
                    { label: "Start", value: "flex-start" },
                    { label: "Center", value: "center" },
                    { label: "End", value: "flex-end" },
                    { label: "Baseline", value: "baseline" }
                ]
            }, {
                name: "gap",
                type: "string",
                defaultValue: "0px"
            }, {
                name: "wrap",
                type: "string",
                defaultValue: "nowrap",
                options: [
                    { label: "No Wrap", value: "nowrap" },
                    { label: "Wrap", value: "wrap" },
                    { label: "Wrap Reverse", value: "wrap-reverse" }
                ]
            }]
        },
        {
            category: "styling",
            props: [{
                name: "className",
                type: "string",
                defaultValue: ""
            }, {
                name: "width",
                type: "string",
                defaultValue: "100%"
            }, {
                name: "height",
                type: "string",
                defaultValue: "auto"
            }, {
                name: "padding",
                type: "string",
                defaultValue: "0px"
            }, {
                name: "margin",
                type: "string",
                defaultValue: "0px"
            }, {
                name: "backgroundColor",
                type: "color",
                defaultValue: "transparent"
            }, {
                name: "borderRadius",
                type: "string",
                defaultValue: "0px"
            }, {
                name: "border",
                type: "string",
                defaultValue: "none"
            }]
        }
    ],
    "Image": [
        {
            category: "content",
            props: [{
                name: "src",
                type: "string",
                defaultValue: "https://via.placeholder.com/300x200"
            }, {
                name: "alt",
                type: "string",
                defaultValue: "Image description"
            }, {
                name: "title",
                type: "string",
                defaultValue: ""
            }]
        },
        {
            category: "styling",
            props: [{
                name: "className",
                type: "string",
                defaultValue: ""
            }, {
                name: "width",
                type: "string",
                defaultValue: "auto"
            }, {
                name: "height",
                type: "string",
                defaultValue: "auto"
            }, {
                name: "objectFit",
                type: "string",
                defaultValue: "cover",
                options: [
                    { label: "Cover", value: "cover" },
                    { label: "Contain", value: "contain" },
                    { label: "Fill", value: "fill" },
                    { label: "None", value: "none" },
                    { label: "Scale Down", value: "scale-down" }
                ]
            }, {
                name: "borderRadius",
                type: "string",
                defaultValue: "0px"
            }, {
                name: "border",
                type: "string",
                defaultValue: "none"
            }, {
                name: "opacity",
                type: "number",
                defaultValue: 1,
                min: 0,
                max: 1,
                step: 0.1
            }]
        }
    ],
    "Video": [
        {
            category: "content",
            props: [{
                name: "src",
                type: "string",
                defaultValue: ""
            }, {
                name: "poster",
                type: "string",
                defaultValue: ""
            }, {
                name: "controls",
                type: "boolean",
                defaultValue: true
            }, {
                name: "autoplay",
                type: "boolean",
                defaultValue: false
            }, {
                name: "loop",
                type: "boolean",
                defaultValue: false
            }, {
                name: "muted",
                type: "boolean",
                defaultValue: false
            }]
        },
        {
            category: "styling",
            props: [{
                name: "className",
                type: "string",
                defaultValue: ""
            }, {
                name: "width",
                type: "string",
                defaultValue: "100%"
            }, {
                name: "height",
                type: "string",
                defaultValue: "auto"
            }, {
                name: "borderRadius",
                type: "string",
                defaultValue: "0px"
            }, {
                name: "border",
                type: "string",
                defaultValue: "none"
            }, {
                name: "opacity",
                type: "number",
                defaultValue: 1,
                min: 0,
                max: 1,
                step: 0.1
            }]
        }
    ],
    "Link": [
        {
            category: "content",
            props: [{
                name: "text",
                type: "string",
                defaultValue: "Click here"
            }, {
                name: "to",
                type: "string",
                defaultValue: "/"
            }, {
                name: "target",
                type: "string",
                defaultValue: "_self",
                options: [
                    { label: "Same Tab", value: "_self" },
                    { label: "New Tab", value: "_blank" }
                ]
            }]
        },
        {
            category: "styling",
            props: [{
                name: "className",
                type: "string",
                defaultValue: ""
            }, {
                name: "fontSize",
                type: "number",
                defaultValue: 16
            }, {
                name: "fontWeight",
                type: "string",
                defaultValue: "normal",
                options: [
                    { label: "Normal", value: "normal" },
                    { label: "Bold", value: "bold" }
                ]
            }, {
                name: "color",
                type: "color",
                defaultValue: "#3b82f6"
            }, {
                name: "textDecoration",
                type: "string",
                defaultValue: "underline",
                options: [
                    { label: "None", value: "none" },
                    { label: "Underline", value: "underline" }
                ]
            }, {
                name: "hoverColor",
                type: "color",
                defaultValue: "#1d4ed8"
            }]
        }
    ]
}

// Component children metadata - only custom components
const componentChildrenMetadata = {
    "PageWrapper": true,
    "Card": false,
    "Text": false,
    "Container": true,
    "Layout": true,
    "Image": false,
    "Video": false,
    "Link": false,
}

export const customNamesToComponentRegistry = {
    "Card": Card,
    "Container": Container,
    "Text": Text,
    "PageWrapper": PageWrapper,
    "Layout": Layout,
    "Image": Image,
    "Video": Video,
    "Link": Link,
}



// All components are now custom components
export const isCustomComponent = (componentName) => {
    return ['Card', 'Container', 'Text', 'PageWrapper', 'Layout', 'Image', 'Video', 'Link'].includes(componentName)
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