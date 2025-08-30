import { useState } from "react"
import { getCategorizedProps, isCustomComponent } from "../../predefcomps/metadata"

// Helper function to generate friendly names from node IDs
const generateFriendlyName = (id) => {
    const parts = id.split(':')

    if (parts.length === 2) {
        return `${parts[0]}${parts[1]}`
    } else if (parts.length === 3 && parts[0] === 'p') {
        return `${parts[1]}${parts[2]}`
    }

    return id
}

// Component to edit object-type props (like style)
const ObjectPropEditor = ({ propKey, propValue, onPropChange }) => {
    const [expanded, setExpanded] = useState(false)

    if (typeof propValue !== 'object' || propValue === null) {
        return null
    }

    return (
        <div className="mb-2">
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
            >
                <span className="mr-1">{expanded ? '▼' : '▶'}</span>
                {propKey}
            </button>
            {expanded && (
                <div className="ml-4 mt-1 space-y-1">
                    {Object.entries(propValue).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                            <label className="text-xs text-gray-600 w-20">{key}:</label>
                            <input
                                type="text"
                                value={value || ''}
                                onChange={(e) => {
                                    const newPropValue = { ...propValue, [key]: e.target.value }
                                    onPropChange(propKey, newPropValue)
                                }}
                                className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 ml-2"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// Component to edit props with categories
const PropEditor = ({ nodeId, nodeEvals, onPropChange }) => {
    const nodeData = nodeEvals[nodeId]

    // Extract component type from nodeId
    const componentType = nodeId.startsWith("p:") ? nodeId.split(":")[1] : nodeId.split(":")[0]
    const categorizedProps = getCategorizedProps(componentType)

    if (!nodeData || !nodeData.props) {
        return <div className="text-sm text-gray-500">No props available</div>
    }

    // Check if this is an HTML element (non-custom component)
    if (!isCustomComponent(componentType)) {
        // For HTML elements, use flat prop structure
        return (
            <div className="space-y-2">
                {Object.entries(nodeData.props).map(([key, value]) => (
                    <div key={key}>
                        {typeof value === 'object' && value !== null ? (
                            <ObjectPropEditor
                                propKey={key}
                                propValue={value}
                                onPropChange={onPropChange}
                            />
                        ) : typeof value === 'boolean' ? (
                            <div className="flex items-center">
                                <label className="text-sm text-gray-700 flex-1">{key}:</label>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => onPropChange(key, e.target.checked)}
                                    className="ml-2"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <label className="text-sm text-gray-700 w-20">{key}:</label>
                                <input
                                    type="text"
                                    value={value || ''}
                                    onChange={(e) => onPropChange(key, e.target.value)}
                                    className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 ml-2"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    if (categorizedProps.length === 0) {
        // Fallback if no categorized props found for custom components
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
                        // Get current value considering nested structure
                        const getCurrentValue = () => {
                            const componentType = nodeId.startsWith("p:") ? nodeId.split(":")[1] : nodeId.split(":")[0]

                            // For custom components, look in the categorized structure
                            if (isCustomComponent(componentType)) {
                                return nodeData.props[category.category]?.[propMeta.name]
                            }

                            // For HTML elements, look at root level
                            return nodeData.props[propMeta.name]
                        }

                        const currentValue = getCurrentValue()

                        return (
                            <div key={propMeta.name}>
                                {propMeta.type === 'object' ? (
                                    <ObjectPropEditor
                                        propKey={propMeta.name}
                                        propValue={currentValue || propMeta.defaultValue || {}}
                                        onPropChange={onPropChange}
                                    />
                                ) : propMeta.type === 'boolean' ? (
                                    <div className="flex items-center">
                                        <label className="text-sm text-gray-700 flex-1">{propMeta.name}:</label>
                                        <input
                                            type="checkbox"
                                            checked={currentValue ?? propMeta.defaultValue}
                                            onChange={(e) => onPropChange(propMeta.name, e.target.checked, category.category)}
                                            className="ml-2"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <label className="text-sm text-gray-700 w-24">{propMeta.name}:</label>
                                        <input
                                            type="text"
                                            value={currentValue ?? propMeta.defaultValue ?? ''}
                                            onChange={(e) => onPropChange(propMeta.name, e.target.value, category.category)}
                                            className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 ml-2"
                                            placeholder={propMeta.defaultValue?.toString() || ''}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

// Component to edit literal values
const LiteralEditor = ({ nodeId, literalValues, onLiteralChange }) => {
    const value = literalValues[nodeId] || ''

    return (
        <div>
            <label className="text-sm text-gray-700 block mb-1">Text Content:</label>
            <textarea
                value={value}
                onChange={(e) => onLiteralChange(nodeId, e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1 resize-none"
                rows="3"
                placeholder="Enter text content..."
            />
        </div>
    )
}

const EditBar = ({
    selectedElement,
    nodeEvals,
    literalValues,
    onClose,
    onPropChange,
    onLiteralChange
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
    const isLiteral = selectedElement.includes(':Literal:')

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
                    {isLiteral ? (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Content</h3>
                            <LiteralEditor
                                nodeId={selectedElement}
                                literalValues={literalValues}
                                onLiteralChange={onLiteralChange}
                            />
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Properties</h3>
                            <PropEditor
                                nodeId={selectedElement}
                                nodeEvals={nodeEvals}
                                onPropChange={(key, value, category) => onPropChange(selectedElement, key, value, category)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditBar
