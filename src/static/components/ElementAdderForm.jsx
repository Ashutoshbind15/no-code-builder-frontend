import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DialogClose } from '../../components/ui/dialog';

const customElementToDefaultPropsMapping = {
    "Card": {
        title: "Hello, World!",
        description: "This is a description",
        image1: "https://images.example.com/150"
    },
    "Text": {
        text: "Hello, World!"
    },
    "Container": {},
    "PageWrapper": {}
}

const customComponents = ["Card", "Text", "Container", "PageWrapper"]
const htmlElements = ["div", "button", "span", "p", "h1", "h2", "h3"]
const allElementTypes = [...customComponents, "Literal", ...htmlElements]

const AddElementForm = ({ parentNodeId, setEvalsState, setLiteralValues, setTreeState }) => {
    const [selectedNodeType, setSelectedNodeType] = useState("Card")

    const handleAddElement = () => {
        const isCustomComponent = customComponents.includes(selectedNodeType)
        const id = uuidv4()

        // Create the node ID based on the type
        let nodeId;
        if (isCustomComponent || selectedNodeType === "Literal") {
            nodeId = `p:${selectedNodeType}:${id}`
        } else {
            nodeId = `${selectedNodeType}:${id}`
        }

        // populate the evals and literals state
        if (isCustomComponent) {
            const componentProps = customElementToDefaultPropsMapping[selectedNodeType];
            setEvalsState(prev => ({
                ...prev,
                [nodeId]: {
                    props: componentProps
                }
            }))
        } else if (selectedNodeType === "Literal") {
            setLiteralValues(prev => ({
                ...prev,
                [nodeId]: "Hello, World!"
            }))
        } else {
            // HTML elements
            setEvalsState(prev => ({
                ...prev,
                [nodeId]: {
                    props: {}
                }
            }))
        }

        // Add to the tree state
        // todo: [mid], not sure if I like this, feels repetitive, find a way to use the 
        // common tree manipulation utils...
        setTreeState(prev => {
            const addNodeToTree = (node) => {
                if (node.id === parentNodeId) {
                    return {
                        ...node,
                        children: [
                            ...(node.children || []),
                            { id: nodeId, children: [] }
                        ]
                    }
                }
                if (node.children) {
                    return {
                        ...node,
                        children: node.children.map(addNodeToTree)
                    }
                }
                return node
            }
            return addNodeToTree(prev)
        })

        // Dialog will close automatically via Dialog.Close
    }

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Element Type
                </label>
                <select
                    value={selectedNodeType}
                    onChange={(e) => setSelectedNodeType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                    <optgroup label="Custom Components">
                        {customComponents.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </optgroup>
                    <optgroup label="Content">
                        <option value="Literal">Literal (Text)</option>
                    </optgroup>
                    <optgroup label="HTML Elements">
                        {htmlElements.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </optgroup>
                </select>
            </div>

            <div className="flex justify-end space-x-2">
                <DialogClose
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Cancel
                </DialogClose>
                <DialogClose asChild>
                    <button
                        onClick={handleAddElement}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Element
                    </button>
                </DialogClose>
            </div>
        </div>
    )
}

export default AddElementForm