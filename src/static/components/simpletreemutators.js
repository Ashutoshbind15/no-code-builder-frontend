export const findAndRemoveNode = (tree, nodeId) => {
    if (tree.id === nodeId) {
        return tree
    }

    if (tree.children) {
        for (let i = 0; i < tree.children.length; i++) {
            if (tree.children[i].id === nodeId) {
                return tree.children.splice(i, 1)[0]
            }
            const found = findAndRemoveNode(tree.children[i], nodeId)
            if (found) return found
        }
    }
    return null
}

export const addNodeToParent = (tree, parentId, nodeToAdd) => {
    if (tree.id === parentId) {
        if (!tree.children) tree.children = []
        tree.children.push(nodeToAdd)
        return true
    }

    if (tree.children) {
        for (let child of tree.children) {
            if (addNodeToParent(child, parentId, nodeToAdd)) {
                return true
            }
        }
    }
    return false
}