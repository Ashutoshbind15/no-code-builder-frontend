import { useState } from "react"
import Sidebar from "../static/components/Sidebar"
import EditBar from "../static/components/EditBar"
import SimpleRenderer from "../static/components/simplestaterenderer"
import { getCategorizedDefaultProps } from "../predefcomps/metadata"

const starterStructure = {
    id: "PageWrapper:0",
    children: [{
        id: "Card:0.1",
        children: []
    }, {
        id: "Text:0.2",
        children: []
    }]
}

// Generate starter node evaluations using metadata defaults
const generateStarterNodeEvals = () => {
    const pageWrapperDefaults = getCategorizedDefaultProps("PageWrapper")
    const cardDefaults = getCategorizedDefaultProps("Card")
    const textDefaults = getCategorizedDefaultProps("Text")

    return {
        "PageWrapper:0": {
            props: pageWrapperDefaults
        },
        "Card:0.1": {
            props: cardDefaults
        },
        "Text:0.2": {
            props: textDefaults
        }
    }
}

const starterNodeEvals = generateStarterNodeEvals()



// All components are now custom components with categorized props
// No HTML elements or literals - simplified architecture
const EditorStatic = () => {

    const [treeState, setTreeState] = useState(starterStructure)
    const [nodeEvals, setNodeEvals] = useState(starterNodeEvals)

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

    // Handler for prop changes - all components use categorized structure
    const handlePropChange = (nodeId, propKey, propValue, category) => {
        setNodeEvals(prev => {
            const currentNode = prev[nodeId]
            if (!currentNode || !category) return prev

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
        })
    }




    return (
        <div className="flex w-full">
            <Sidebar
                treeState={treeState}
                setTreeState={setTreeState}
                selectedElement={selectedElement}
                onSelectElement={handleSelectElement}
                setEvalsState={setNodeEvals}
            />
            <div className="w-2/4 bg-blue-500 p-4">
                <SimpleRenderer node={treeState} evalsState={nodeEvals} />
            </div>
            <EditBar
                selectedElement={selectedElement}
                nodeEvals={nodeEvals}
                onClose={handleCloseEditBar}
                onPropChange={handlePropChange}
            />
        </div>
    )
}

export default EditorStatic