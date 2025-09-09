import { useAtom, useSetAtom } from "jotai";
import { selectedElementAtom, removeNodeAtom, nodeAtomFamily, findParentNodeIdAtom } from "../atoms";
import AddElementDialog from "./AddElementDialog";

// controllable selection, draggable, droppable, deletable from here

// todo: [high], look up the node meta, and for the nodes that dont take children, dont allow the children addition for them
const NodeWrappers = ({ nodeId, children }) => {
    return (
        <NodeSelectionWrapper nodeId={nodeId}>
            {children}
        </NodeSelectionWrapper>
    )
}

const NodeSelectionWrapper = ({ nodeId, children }) => {
    const [selectedElement, setSelectedElement] = useAtom(selectedElementAtom);
    const removeNode = useSetAtom(removeNodeAtom);
    // todo: [mid] [optimization], store refs bi-directionally, in the state itself, saving a recursive call for finding..
    const findParentNodeId = useSetAtom(findParentNodeIdAtom);

    const isSelected = selectedElement === nodeId;

    const handleDelete = async (e) => {
        e.stopPropagation();

        // Find the parent node ID
        const parentId = findParentNodeId(nodeId);

        // Clear selection if this node is selected
        if (selectedElement === nodeId) {
            setSelectedElement(null);
        }

        // Remove the node with proper parent ID
        removeNode({ nodeId, parentId });
    };

    return (
        <div
            className={`relative group ${isSelected ? "border-2 border-blue-500" : "border-2 border-transparent"} hover:border-blue-300 transition-colors`}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(nodeId);
            }}
            style={{ position: 'relative', zIndex: isSelected ? 10 : 'auto' }}
        >
            {children}

            {/* Action buttons - only show when selected */}
            {isSelected && (
                <div
                    className="absolute top-0 right-0 flex gap-1 p-1 bg-white shadow-lg rounded-bl-md border-l border-b border-gray-200"
                    style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        zIndex: 1000,
                        pointerEvents: 'auto'
                    }}
                >
                    {/* Add button */}
                    <AddElementDialog parentNodeId={nodeId}>
                        <button
                            className="w-6 h-6 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            title="Add child element"
                            style={{ pointerEvents: 'auto' }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </AddElementDialog>

                    {/* Delete button - don't show for root PageWrapper */}
                    {!nodeId.startsWith('PageWrapper:0') && (
                        <button
                            className="w-6 h-6 flex items-center justify-center text-red-600 hover:bg-red-50 rounded transition-colors"
                            onClick={handleDelete}
                            title="Delete element"
                            style={{ pointerEvents: 'auto' }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default NodeWrappers;