
import { useAtomValue, useSetAtom } from 'jotai'
import AddElementDialog from './AddElementDialog'
import { nodeAtomFamily, selectedElementAtom, rootNodeIdAtom } from "../atoms"

// Helper function to generate friendly names from node IDs
const generateFriendlyName = (id) => {
    // Format is now "ComponentType:id"
    const parts = id.split(':')

    if (parts.length === 2) {
        return `${parts[0]}${parts[1]}`
    }

    // Fallback to the original ID
    return id
}

// Tree item component - now uses atom structure
const TreeItem = ({ nodeId, depth = 0 }) => {
    const node = useAtomValue(nodeAtomFamily(nodeId))
    const selectedElement = useAtomValue(selectedElementAtom)
    const setSelectedElement = useSetAtom(selectedElementAtom)

    const friendlyName = generateFriendlyName(nodeId)
    const indentStyle = { paddingLeft: `${depth * 20}px` }
    const isSelected = selectedElement === nodeId

    const handleItemClick = (e) => {
        e.stopPropagation()
        setSelectedElement(nodeId)
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
                    <AddElementDialog parentNodeId={nodeId}>
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
            {node.children && node.children.map(childId => (
                <TreeItem
                    key={childId}
                    nodeId={childId}
                    depth={depth + 1}
                />
            ))}
        </div>
    )
}

// File tree view component - now uses atoms
const FileTreeView = () => {
    const rootNodeId = useAtomValue(rootNodeIdAtom)

    return (
        <div className="file-tree">
            <div className="border-b border-gray-200 pb-2 mb-2">
                <h3 className="text-sm font-semibold text-gray-600 px-2">Structure</h3>
            </div>
            <div className="tree-container">
                <TreeItem nodeId={rootNodeId} />
            </div>
        </div>
    )
}

const Sidebar = () => {
    return (
        <div className="w-1/4 bg-white border-r border-gray-300 overflow-y-auto">
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Editor</h2>
                <FileTreeView />
            </div>
        </div>
    )
}

export default Sidebar