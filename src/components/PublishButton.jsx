import { useState } from 'react';
import { useAtomValue, useStore } from 'jotai';
import {
    rootNodeIdAtom,
    nodeAtomFamily,
    nodePropsAtomFamily,
    allNodeIdsAtom
} from '../static/atoms';

const PublishButton = () => {
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishStatus, setPublishStatus] = useState(null); // 'success', 'error', null
    const [publishMessage, setPublishMessage] = useState('');

    const store = useStore();
    const allNodeIds = useAtomValue(allNodeIdsAtom);
    const rootNodeId = useAtomValue(rootNodeIdAtom);

    const serializeCurrentState = () => {
        const nodeGraph = {};
        const nodeProps = {};

        allNodeIds.forEach(nodeId => {
            try {
                // Get node structure
                const node = store.get(nodeAtomFamily(nodeId));
                nodeGraph[nodeId] = {
                    id: node.id,
                    componentType: node.componentType,
                    children: node.children || []
                };

                // Get node properties
                const props = store.get(nodePropsAtomFamily(nodeId));
                nodeProps[nodeId] = props;
            } catch (error) {
                console.warn(`Failed to serialize node ${nodeId}:`, error);
            }
        });

        return {
            nodeGraph,
            nodeProps,
            rootNodeId,
            metadata: {
                serializedAt: new Date().toISOString(),
                nodeCount: allNodeIds.length
            }
        };
    };

    const handlePublish = async () => {
        setIsPublishing(true);
        setPublishStatus(null);
        setPublishMessage('');

        try {
            const serializedState = serializeCurrentState();

            // Log the serialized state for debugging
            console.group('🚀 Publishing State to Backend');
            console.log('📊 Serialized Data:', serializedState);
            console.log('🌐 Endpoint: http://localhost:3000/api/publish');
            console.groupEnd();

            const response = await fetch('http://localhost:3000/api/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serializedState)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            setPublishStatus('success');
            setPublishMessage('Successfully published to backend!');
            console.log('Publish successful:', result);

        } catch (error) {
            setPublishStatus('error');
            setPublishMessage(`Failed to publish: ${error.message}`);
            console.error('Publish failed:', error);
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="space-y-3">
                <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isPublishing
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    {isPublishing ? 'Publishing...' : 'Publish'}
                </button>

                {publishStatus && (
                    <div className={`p-3 rounded-lg text-sm ${publishStatus === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        {publishMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublishButton;
