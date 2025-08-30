import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DialogClose } from '../../components/ui/dialog';
import { getCategorizedDefaultProps } from '../../predefcomps/metadata';

const customComponents = ["Card", "Text", "Container", "PageWrapper"]

const AddElementForm = ({ parentNodeId, setEvalsState, setTreeState }) => {
    const [selectedNodeType, setSelectedNodeType] = useState("Card")

    const handleAddElement = () => {
        const id = uuidv4()
        const nodeId = `${selectedNodeType}:${id}`

        // All components are custom components - get categorized props
        const componentProps = getCategorizedDefaultProps(selectedNodeType)
        setEvalsState(prev => ({
            ...prev,
            [nodeId]: {
                props: componentProps
            }
        }))

        // Add to the tree state
        // todo: [mid], use some common utils
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
                    {customComponents.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
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