import { memo } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { previewModeAtom, nodeActionsAtomFamily, executeActionChainAtom } from '../atoms'

// EventWrapper component that conditionally applies event handlers based on preview mode
const EventWrapper = memo(({ nodeId, children }) => {
    const previewMode = useAtomValue(previewModeAtom)
    const nodeActions = useAtomValue(nodeActionsAtomFamily(nodeId))
    const executeActionChain = useSetAtom(executeActionChainAtom)

    // If not in preview mode, return children without wrapper
    if (!previewMode) {
        return children
    }

    // Build event handlers object for events that have actions
    const eventHandlers = {}

    Object.entries(nodeActions).forEach(([eventType, actionChain]) => {
        if (actionChain && actionChain.length > 0) {
            eventHandlers[eventType] = (event) => {
                // Prevent default for certain events if needed
                if (eventType === 'onSubmit') {
                    event.preventDefault()
                }

                executeActionChain({ nodeId, eventType })
            }
        }
    })

    // If no event handlers, return children as-is
    if (Object.keys(eventHandlers).length === 0) {
        return children
    }

    // Wrap children in a div with event handlers
    return (
        <div
            {...eventHandlers}
            data-has-actions="true"
            data-node-id={nodeId}
            style={{ display: 'contents' }}
        >
            {children}
        </div>
    )
})

EventWrapper.displayName = 'EventWrapper'

export default EventWrapper
