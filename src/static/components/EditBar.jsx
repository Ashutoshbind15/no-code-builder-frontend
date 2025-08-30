import { useState } from "react"

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

// Component to edit props
const PropEditor = ({ nodeId, nodeEvals, onPropChange }) => {
    const nodeData = nodeEvals[nodeId]

    if (!nodeData || !nodeData.props) {
        return <div className="text-sm text-gray-500">No props available</div>
    }

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
                                onPropChange={(key, value) => onPropChange(selectedElement, key, value)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditBar
