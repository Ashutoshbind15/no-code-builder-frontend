import { useState } from "react"
import { getCategorizedProps } from "../../predefcomps/metadata"

// Helper function to generate friendly names from node IDs
const generateFriendlyName = (id) => {
    // Format is now "ComponentType:id"
    const parts = id.split(':')

    if (parts.length === 2) {
        return `${parts[0]}${parts[1]}`
    }

    return id
}



// Component to edit props with categories - all components are custom components
const PropEditor = ({ nodeId, nodeEvals, onPropChange }) => {
    const nodeData = nodeEvals[nodeId]

    // Extract component type from nodeId (format: "ComponentType:id")
    const componentType = nodeId.split(":")[0]
    const categorizedProps = getCategorizedProps(componentType)

    if (!nodeData || !nodeData.props) {
        return <div className="text-sm text-gray-500">No props available</div>
    }

    if (categorizedProps.length === 0) {
        return <div className="text-sm text-gray-500">No props available</div>
    }

    return (
        <div className="space-y-4">
            {categorizedProps.map((category, categoryIndex) => (
                <CategoryEditor
                    key={categoryIndex}
                    category={category}
                    nodeData={nodeData}
                    nodeId={nodeId}
                    onPropChange={onPropChange}
                />
            ))}
        </div>
    )
}

// Component to edit a category of props
const CategoryEditor = ({ category, nodeData, nodeId, onPropChange }) => {
    const [expanded, setExpanded] = useState(true)

    if (!category.props || category.props.length === 0) {
        return null
    }

    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            >
                <span className="font-medium text-gray-800 capitalize">{category.category}</span>
                <span className="text-gray-500">{expanded ? '▼' : '▶'}</span>
            </button>
            {expanded && (
                <div className="p-3 space-y-2">
                    {category.props.map((propMeta) => {
                        // Get current value from categorized structure
                        const getCurrentValue = () => {
                            return nodeData.props[category.category]?.[propMeta.name]
                        }

                        const currentValue = getCurrentValue()

                        return (
                            <div key={propMeta.name} className="flex items-center">
                                <label className="text-sm text-gray-700 w-24">{propMeta.name}:</label>
                                {propMeta.type === 'boolean' ? (
                                    <input
                                        type="checkbox"
                                        checked={currentValue ?? propMeta.defaultValue ?? false}
                                        onChange={(e) => onPropChange(propMeta.name, e.target.checked, category.category)}
                                        className="ml-2"
                                    />
                                ) : propMeta.type === 'number' ? (
                                    <input
                                        type="number"
                                        value={currentValue ?? propMeta.defaultValue ?? ''}
                                        onChange={(e) => onPropChange(propMeta.name, parseFloat(e.target.value) || 0, category.category)}
                                        className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 ml-2"
                                        placeholder={propMeta.defaultValue?.toString() || ''}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={currentValue ?? propMeta.defaultValue ?? ''}
                                        onChange={(e) => onPropChange(propMeta.name, e.target.value, category.category)}
                                        className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 ml-2"
                                        placeholder={propMeta.defaultValue?.toString() || ''}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}



const EditBar = ({
    selectedElement,
    nodeEvals,
    onClose,
    onPropChange
}) => {
    if (!selectedElement) {
        return (
            <div className="w-1/4 bg-gray-50 border-l border-gray-300">
                <div className="p-4 text-center text-gray-500">
                    <p className="text-sm">No element selected</p>
                    <p className="text-xs mt-1">Click on an element in the tree to edit it</p>
                </div>
            </div>
        )
    }

    const friendlyName = generateFriendlyName(selectedElement)

    return (
        <div className="w-1/4 bg-white border-l border-gray-300 overflow-y-auto">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Edit Element</h2>
                    <button
                        onClick={onClose}
                        className="w-6 h-6 text-gray-500 hover:text-gray-700 flex items-center justify-center"
                        title="Close"
                    >
                        ×
                    </button>
                </div>

                {/* Selected Element Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">Selected:</div>
                    <div className="font-mono text-sm text-gray-800">{friendlyName}</div>
                    <div className="text-xs text-gray-500 mt-1">{selectedElement}</div>
                </div>

                {/* Editor Content */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Properties</h3>
                        <PropEditor
                            nodeId={selectedElement}
                            nodeEvals={nodeEvals}
                            onPropChange={(key, value, category) => onPropChange(selectedElement, key, value, category)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBar
