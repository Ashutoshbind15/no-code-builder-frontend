

import AddElementDialog from './AddElementDialog'

// Helper function to generate friendly names from node IDs
const generateFriendlyName = (id) => {
    // Extract the component type and number from the ID
    // Examples: "div:0" -> "div0", "p:Card:2.1" -> "Card2.1", "button:1.1" -> "button1.1"
    const parts = id.split(':')

    if (parts.length === 2) {
        // Standard HTML elements like "div:0", "button:1.1"
        return `${parts[0]}${parts[1]}`
    } else if (parts.length === 3 && parts[0] === 'p') {
        // Custom components like "p:Card:2.1", "p:Literal:1.1.1"
        return `${parts[1]}${parts[2]}`
    }

    // Fallback to the original ID
    return id
}

// Tree item component
const TreeItem = ({ node, depth = 0, selectedElement, onSelectElement, setTreeState, setEvalsState, setLiteralValues }) => {
    const friendlyName = generateFriendlyName(node.id)
    const indentStyle = { paddingLeft: `${depth * 20}px` }
    const isSelected = selectedElement === node.id

    const handleItemClick = (e) => {
        e.stopPropagation()
        onSelectElement(node.id)
    }

    return (
        <div className="tree-item">
            <div
                className={`flex items-center justify-between py-1 px-2 cursor-pointer ${isSelected
                    ? 'bg-gray-300 hover:bg-gray-400'
                    : 'hover:bg-gray-100'
                    }`}
                style={indentStyle}
                onClick={handleItemClick}
            >
                <span className="text-sm font-mono text-gray-700">
                    {friendlyName}
                </span>
                <div className="flex items-center gap-1">
                    <AddElementDialog
                        parentNodeId={node.id}
                        setEvalsState={setEvalsState}
                        setLiteralValues={setLiteralValues}
                        setTreeState={setTreeState}
                    >
                        <button
                            className="w-5 h-5 text-xs bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
                            title="Add child"
                            onClick={(e) => e.stopPropagation()}
                        >
                            +
                        </button>
                    </AddElementDialog>
                    <button
                        className="w-5 h-5 text-xs bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                        title="Delete"
                        onClick={(e) => e.stopPropagation()}
                    >
                        ×
                    </button>
                </div>
            </div>
            {node.children && node.children.map(child => (
                <TreeItem
                    key={child.id}
                    node={child}
                    depth={depth + 1}
                    selectedElement={selectedElement}
                    onSelectElement={onSelectElement}
                    setTreeState={setTreeState}
                    setEvalsState={setEvalsState}
                    setLiteralValues={setLiteralValues}
                />
            ))}
        </div>
    )
}

// File tree view component
const FileTreeView = ({ treeState, selectedElement, onSelectElement, setTreeState, setEvalsState, setLiteralValues }) => {
    if (!treeState) {
        return <div className="p-4 text-gray-500">No tree data available</div>
    }

    return (
        <div className="file-tree">
            <div className="border-b border-gray-200 pb-2 mb-2">
                <h3 className="text-sm font-semibold text-gray-600 px-2">Structure</h3>
            </div>
            <div className="tree-container">
                <TreeItem
                    node={treeState}
                    selectedElement={selectedElement}
                    onSelectElement={onSelectElement}
                    setTreeState={setTreeState}
                    setEvalsState={setEvalsState}
                    setLiteralValues={setLiteralValues}
                />
            </div>
        </div>
    )
}

const Sidebar = ({ treeState, selectedElement, onSelectElement, setTreeState, setEvalsState, setLiteralValues }) => {
    return (
        <div className="w-1/4 bg-white border-r border-gray-300 overflow-y-auto">
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Editor</h2>
                <FileTreeView
                    treeState={treeState}
                    selectedElement={selectedElement}
                    onSelectElement={onSelectElement}
                    setTreeState={setTreeState}
                    setEvalsState={setEvalsState}
                    setLiteralValues={setLiteralValues}
                />
            </div>
        </div>
    )
}

export default Sidebar