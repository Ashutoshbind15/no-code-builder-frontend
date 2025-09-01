import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { DialogClose } from '../../components/ui/dialog';
import { getCategorizedDefaultProps } from '../../predefcomps/metadata';
import { addNodeAtom } from '../atoms';

// Organized component categories for better UX
const componentCategories = {
    "Layout": ["PageWrapper", "Layout", "Container"],
    "Content": ["Text", "Image", "Video", "Link"],
    "Interactive": ["Card"],
}

// Component descriptions for better UX
const componentDescriptions = {
    "PageWrapper": "Main page container with background and layout settings",
    "Layout": "Flexbox container for arranging elements with direction, alignment, and spacing controls",
    "Container": "Simple container for grouping elements",
    "Text": "Typography component with support for headings, paragraphs, and text styling",
    "Image": "Image display with size, fit, and styling options",
    "Video": "Video player with controls, autoplay, and poster image support",
    "Link": "Navigation links with React Router integration for internal and external links",
    "Card": "Content card with title, description, and image",
}

const AddElementForm = ({ parentNodeId }) => {
    const [selectedNodeType, setSelectedNodeType] = useState("Text")
    const addNode = useSetAtom(addNodeAtom)

    const handleAddElement = () => {
        const id = uuidv4()
        const nodeId = `${selectedNodeType}:${id}`

        // All components are custom components - get categorized props
        const componentProps = getCategorizedDefaultProps(selectedNodeType)

        // Add the node using the atom
        addNode({
            parentId: parentNodeId,
            nodeId,
            componentType: selectedNodeType,
            defaultProps: componentProps
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
                    {Object.entries(componentCategories).map(([category, components]) => (
                        <optgroup key={category} label={category}>
                            {components.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>

            {/* Component Description */}
            {componentDescriptions[selectedNodeType] && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                        <span className="font-medium">{selectedNodeType}:</span> {componentDescriptions[selectedNodeType]}
                    </p>
                </div>
            )}

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