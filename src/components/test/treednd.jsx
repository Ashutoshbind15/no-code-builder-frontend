import React, { useState } from 'react'

const treeStruct =
{
    name: "root",
    className: "w-96 h-96 flex items-center justify-around p-4 border-2 border-gray-200 rounded-lg",
    children: [
        {
            name: "child1",
            parent: "root",
            className: "w-1/3 h-80 flex flex-col items-center p-4 rounded-mg border-2 border-blue-500",
            children: [
                {
                    name: "child1-1",
                    parent: "child1",
                    className: "w-full h-40 rounded-md border-2 border-red-500"
                }
            ]
        }, {
            name: "child2",
            parent: "root",
            className: "w-1/3 h-80 flex flex-col items-center p-4 rounded-mg border-2 border-blue-500",
            children: []
        }
    ]
}


const NodeContainer = ({ node }) => {

    const handleDragStart = (e) => {

        const dataToBeSent = {
            name: node.name,
            parent: node.parent
        }

        e.dataTransfer.setData('text/plain', JSON.stringify(dataToBeSent))
        e.stopPropagation()
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        const receivedData = JSON.parse(e.dataTransfer.getData('text/plain'))
        const droppedNode = receivedData.name
        const droppedNodeParent = receivedData.parent

        const currentNode = node

        console.log("dropped", droppedNode)
        console.log("current", currentNode.name)
        console.log("droppedNodeParent", droppedNodeParent)

        e.stopPropagation()
    }

    return (
        <div className={node.className} draggable onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}>
            {node.children && node.children.map((child) => (
                <NodeContainer key={child.name} node={child} />
            ))}
        </div>
    )
}

const Treednd = () => {

    const [treeState, setTreeState] = useState(treeStruct)

    return (
        <>
            <NodeContainer node={treeState} />
        </>
    )
}

export default Treednd