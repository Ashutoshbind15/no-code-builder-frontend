// todo: also add a droppable prop

import { addNodeToParent, findAndRemoveNode } from "../static/components/simpletreemutators"

const DraggableNodeWrapper = ({ nodeId, treeState, setTreeState, children, canTakeChildren, isDraggable = true }) => {

    const handleDragStart = (e) => {
        const dataToBeSent = {
            nodeId: nodeId
        }
        e.dataTransfer.setData('text/plain', JSON.stringify(dataToBeSent))
        e.stopPropagation()
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const receivedData = JSON.parse(e.dataTransfer.getData('text/plain'))
        const droppedNodeId = receivedData.nodeId

        // Don't drop on self or if can't take children
        if (droppedNodeId === nodeId || !canTakeChildren) {
            e.stopPropagation()
            return
        }

        // Move the node in the tree
        moveNode(droppedNodeId, nodeId)
        e.stopPropagation()
    }

    const moveNode = (sourceNodeId, targetParentId) => {
        const newTreeState = JSON.parse(JSON.stringify(treeState))

        // Find and remove source node
        const sourceNode = findAndRemoveNode(newTreeState, sourceNodeId)
        if (!sourceNode) return

        // Add to target parent
        addNodeToParent(newTreeState, targetParentId, sourceNode)

        setTreeState(newTreeState)
    }

    return <div
        draggable={isDraggable}
        onDragStart={isDraggable ? handleDragStart : undefined}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
            border: canTakeChildren ? '2px dashed rgba(0,0,255,0.3)' : '1px solid rgba(0,0,0,0.1)',
            minHeight: '20px',
            position: 'relative'
        }}
        className="dnd-component"
    >
        {children}
    </div>

}

export default DraggableNodeWrapper