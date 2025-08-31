import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

// Atom family for individual node data (adjacency list structure)
// Each node has: { id, componentType, children: [nodeIds] }
export const nodeAtomFamily = atomFamily((nodeId) =>
    atom({
        id: nodeId,
        componentType: nodeId.split(':')[0],
        children: []
    })
);

// Atom family for node properties (categorized props)
export const nodePropsAtomFamily = atomFamily((nodeId) =>
    atom({})
);

// Root node ID atom
export const rootNodeIdAtom = atom("PageWrapper:0");

// Selected element atom
export const selectedElementAtom = atom(null);

// Derived atom to get all node IDs in the tree (for cleanup/traversal)
export const allNodeIdsAtom = atom((get) => {
    const rootId = get(rootNodeIdAtom);
    const nodeIds = new Set();

    const traverse = (nodeId) => {
        if (!nodeId || nodeIds.has(nodeId)) return;
        nodeIds.add(nodeId);

        try {
            const node = get(nodeAtomFamily(nodeId));
            if (node.children) {
                node.children.forEach(traverse);
            }
        } catch (e) {
            // Node doesn't exist, skip
        }
    };

    traverse(rootId);
    return Array.from(nodeIds);
});

// todo: [mid], add some sort of transaction support..
// also, check the order of the setting in the setters of the atoms

// answer -> it wont matter much, since we only add to the parent in the last step, and till
// then, it's not rendered anywhere, and similar logic for the removal as well

// Helper atom to add a new node to the tree
export const addNodeAtom = atom(
    null,
    (get, set, { parentId, nodeId, componentType, defaultProps }) => {
        // Create the new node
        set(nodeAtomFamily(nodeId), {
            id: nodeId,
            componentType,
            children: []
        });

        // Set default props
        set(nodePropsAtomFamily(nodeId), defaultProps);

        // Add to parent's children
        const parentNode = get(nodeAtomFamily(parentId));
        set(nodeAtomFamily(parentId), {
            ...parentNode,
            children: [...parentNode.children, nodeId]
        });
    }
);

// Helper atom to remove a node from the tree
export const removeNodeAtom = atom(
    null,
    (get, set, { nodeId, parentId }) => {
        // Remove from parent's children
        if (parentId) {
            const parentNode = get(nodeAtomFamily(parentId));
            set(nodeAtomFamily(parentId), {
                ...parentNode,
                children: parentNode.children.filter(childId => childId !== nodeId)
            });
        }

        // Clean up the node and its props
        set(nodeAtomFamily(nodeId), { id: nodeId, componentType: '', children: [] });
        set(nodePropsAtomFamily(nodeId), {});
    }
);

// Helper atom to update node props
export const updateNodePropsAtom = atom(
    null,
    (get, set, { nodeId, propKey, propValue, category }) => {
        const currentProps = get(nodePropsAtomFamily(nodeId));
        set(nodePropsAtomFamily(nodeId), {
            ...currentProps,
            [category]: {
                ...currentProps[category],
                [propKey]: propValue
            }
        });
    }
);

// Helper atom to find parent node ID
export const findParentNodeIdAtom = atom(
    null,
    (get, set, nodeId) => {
        const rootId = get(rootNodeIdAtom);

        const findParent = (currentNodeId, targetNodeId) => {
            try {
                const currentNode = get(nodeAtomFamily(currentNodeId));
                if (currentNode.children && currentNode.children.includes(targetNodeId)) {
                    return currentNodeId;
                }

                // Recursively search in children
                for (const childId of currentNode.children || []) {
                    const found = findParent(childId, targetNodeId);
                    if (found) return found;
                }
            } catch (e) {
                // Node doesn't exist, skip
            }
            return null;
        };

        return findParent(rootId, nodeId);
    }
);

// Helper atom to initialize the tree with starter data
export const initializeTreeAtom = atom(
    null,
    (get, set, { starterStructure, starterNodeEvals }) => {
        // Initialize root node
        const rootId = starterStructure.id;
        set(rootNodeIdAtom, rootId);

        // Recursive function to initialize nodes
        const initializeNode = (nodeData) => {
            const { id, children } = nodeData;
            const componentType = id.split(':')[0];
            const childIds = children ? children.map(child => child.id) : [];

            // Set node structure
            set(nodeAtomFamily(id), {
                id,
                componentType,
                children: childIds
            });

            // Set node props if available
            if (starterNodeEvals[id]) {
                set(nodePropsAtomFamily(id), starterNodeEvals[id].props);
            }

            // Initialize children recursively
            if (children) {
                children.forEach(initializeNode);
            }
        };

        initializeNode(starterStructure);
    }
);
