import { useState } from "react"
import Sidebar from "../static/components/Sidebar"
import EditBar from "../static/components/EditBar"
import SimpleRenderer from "../static/components/simplestaterenderer"
import { getCategorizedDefaultProps, isCustomComponent } from "../predefcomps/metadata"

const starterStructure = {
    id: "p:PageWrapper:0",
    children: [{
        id: "p:Literal:0.1",
    }, {
        id: "p:Card:0.2",
    }]
}

// Generate starter node evaluations using metadata defaults
const generateStarterNodeEvals = () => {
    const pageWrapperDefaults = getCategorizedDefaultProps("PageWrapper")
    const cardDefaults = getCategorizedDefaultProps("Card")

    return {
        "p:PageWrapper:0": {
            props: pageWrapperDefaults
        },
        "p:Card:0.2": {
            props: {
                content: cardDefaults.content || {},
                containerStyles: cardDefaults.containerStyles || {}
            }
        }
    }
}

const starterNodeEvals = generateStarterNodeEvals()

const starterLiteralValues = {
    "p:Literal:0.1": "Hello, World!"
}

// where exactly do we want the defaults for the props to resolve?

// do we define a map of all the porps that a component takes, make them compulsary at the component level, and at runtime only, 
// do we define and pass all of them, acc to the defaults defined pre-hand...

// or do we also allow default props on the code level, so we dont necessarily need to pass all the props while creating/adding at runtime...

//any of the two, but one thing must not be allowed, i.e. adding a component without a compulsary prop...

// first one seems more logical, as it'd give predictable errors, and we anyways need to track the props


// for now the state change is controlled by the sidebar,
// later, when dnd, select tracking, and mouse events are added,
// we can change the tree state from within the renderer as well,
// we can refer to the dndeditor example for the same..
const EditorStatic = () => {

    const [treeState, setTreeState] = useState(starterStructure)
    const [nodeEvals, setNodeEvals] = useState(starterNodeEvals)
    const [literalValues, setLiteralValues] = useState(starterLiteralValues)
    const [selectedElement, setSelectedElement] = useState(null)

    // Handler for selecting elements
    const handleSelectElement = (elementId) => {
        setSelectedElement(elementId)
    }

    // Handler for closing the edit bar
    const handleCloseEditBar = () => {
        setSelectedElement(null)
    }

    // todo: [mid] to make the state global maybe

    // Handler for prop changes - uses categorized structure for custom components
    const handlePropChange = (nodeId, propKey, propValue, category = null) => {
        setNodeEvals(prev => {
            const currentNode = prev[nodeId]
            if (!currentNode) return prev

            // Skip if props is empty object (HTML elements with no props)
            if (!currentNode.props || Object.keys(currentNode.props).length === 0) {
                return prev
            }

            // Extract component type from nodeId
            const componentType = nodeId.startsWith("p:") ? nodeId.split(":")[1] : nodeId.split(":")[0]

            // Check if this is a custom component
            if (isCustomComponent(componentType)) {
                // For custom components, we need to know which category the prop belongs to
                if (!category) {
                    // Try to determine category from metadata
                    const metadata = getCategorizedDefaultProps(componentType)
                    for (const [cat, props] of Object.entries(metadata)) {
                        if (props && propKey in props) {
                            category = cat
                            break
                        }
                    }
                }

                if (category) {
                    return {
                        ...prev,
                        [nodeId]: {
                            ...currentNode,
                            props: {
                                ...currentNode.props,
                                [category]: {
                                    ...currentNode.props[category],
                                    [propKey]: propValue
                                }
                            }
                        }
                    }
                }
            }

            // For HTML elements, use flat structure
            return {
                ...prev,
                [nodeId]: {
                    ...currentNode,
                    props: {
                        ...currentNode.props,
                        [propKey]: propValue
                    }
                }
            }
        })
    }

    // Handler for literal value changes
    const handleLiteralChange = (nodeId, value) => {
        setLiteralValues(prev => ({
            ...prev,
            [nodeId]: value
        }))
    }


    return (
        <div className="flex w-full">
            <Sidebar
                treeState={treeState}
                setTreeState={setTreeState}
                selectedElement={selectedElement}
                onSelectElement={handleSelectElement}
                setEvalsState={setNodeEvals}
                setLiteralValues={setLiteralValues}
            />
            <div className="w-2/4 bg-blue-500 p-4">
                <SimpleRenderer node={treeState} evalsState={nodeEvals} literalValues={literalValues} />
            </div>
            <EditBar
                selectedElement={selectedElement}
                nodeEvals={nodeEvals}
                literalValues={literalValues}
                onClose={handleCloseEditBar}
                onPropChange={handlePropChange}
                onLiteralChange={handleLiteralChange}
            />
        </div>
    )
}

export default EditorStatic