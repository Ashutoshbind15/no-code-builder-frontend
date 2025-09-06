import { memo, useState } from "react"
import { useAtomValue, useSetAtom } from 'jotai'
import { getCategorizedProps } from "../../predefcomps/metadata"
import {
    selectedElementAtom,
    nodePropsAtomFamily,
    updateNodePropsAtom,
    nodeActionsAtomFamily,
    addActionToEventAtom,
    removeActionFromEventAtom,
    updateActionParamsAtom,
    moveActionAtom,
    previewModeAtom
} from "../atoms"
import { getPropEditor } from "../../predefcomps/propEditors"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ACTION_TYPES, EVENT_TYPES } from "../actions/meta"

const generateFriendlyName = (id) => {
    return id.split(':')[0]
}

// Simple prop editor row component
const PropEditorRow = memo(({ propMeta, currentValue, categoryName, nodeId }) => {
    const PropEditorComponent = getPropEditor(propMeta)
    const updateNodeProps = useSetAtom(updateNodePropsAtom)

    const handleChange = (value) => {
        updateNodeProps({ nodeId, propKey: propMeta.name, propValue: value, category: categoryName })
    }

    return (
        <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700 min-w-[80px] font-medium">
                {propMeta.name}:
            </label>
            <div className="flex-1">
                <PropEditorComponent
                    value={currentValue ?? propMeta.defaultValue}
                    onChange={handleChange}
                    placeholder={propMeta.defaultValue?.toString() || ''}
                />
            </div>
        </div>
    )
})

// Simple category section component
const CategorySection = ({ category, nodeId }) => {
    // todo: [mid], create more granular atoms if needed.., but also check its mem footprint..
    // we access nodeProps here, as we would then pass the actual prop values for each rows, and then in turn memoize the rows
    const nodeProps = useAtomValue(nodePropsAtomFamily(nodeId))
    const categoryName = category.category
    const [isExpanded, setIsExpanded] = useState(true)

    const onToggle = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            >
                <span className="font-medium text-gray-800 capitalize">{categoryName}</span>
                <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
            </button>
            {isExpanded && (
                <div className="p-3 space-y-3">
                    {category.props.map((propMeta) => {
                        const currentValue = nodeProps[categoryName]?.[propMeta.name]
                        return (
                            <PropEditorRow
                                key={propMeta.name}
                                propMeta={propMeta}
                                currentValue={currentValue}
                                categoryName={categoryName}
                                nodeId={nodeId}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

// Props editor component
const PropsEditor = ({ nodeId }) => {
    // Extract component type from nodeId (format: "ComponentType:id")
    const componentType = nodeId.split(":")[0]

    const categorizedProps = getCategorizedProps(componentType)

    if (categorizedProps.length === 0) {
        return <div className="text-sm text-gray-500">No props available</div>
    }

    return (
        <div className="space-y-3">
            {categorizedProps.map((category) => {

                if (!category.props || category.props.length === 0) return null

                return (
                    <CategorySection
                        key={category.category}
                        category={category}
                        nodeId={nodeId}
                    />
                )
            })}
        </div>
    )
}

// todo: [high], check whether or not we need to memoize its children, or even whether its worth it
// memoization here, would optimize the rendering of each individual prop editors, and the categories sections

// answer -> currently we needed to memoize each row rendering prop editors, and it works with objects as well
// cause currently, the objects are static, if rendered from a backend, store em inside an atom or something..

const EditBar = () => {
    const selectedElement = useAtomValue(selectedElementAtom)
    const setSelectedElement = useSetAtom(selectedElementAtom)

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

    const handleClose = () => {
        setSelectedElement(null)
    }

    return (
        <div className="w-1/4 bg-white border-l border-gray-300 overflow-y-auto">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Edit Element</h2>
                    <button
                        onClick={handleClose}
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
                <div>
                    <Tabs>
                        <TabsList>
                            <TabsTrigger value="properties">Properties</TabsTrigger>
                            <TabsTrigger value="actions">Actions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="properties">
                            <PropsEditor nodeId={selectedElement} />
                        </TabsContent>
                        <TabsContent value="actions">
                            <ActionsEditor nodeId={selectedElement} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

// Enhanced action parameter input component with proper types
const ActionParamInput = ({ param, value, onChange, paramIndex, actionType }) => {
    const getInputType = (param, actionType) => {
        if (param === 'duration') return 'text'
        if (param === 'url') return 'url'
        if (param === 'endpoint') return 'url'
        if (param === 'method') return 'select'
        if (param === 'target') return 'select'
        if (param === 'animationType') return 'select'
        if (param === 'easing') return 'select'
        return 'text'
    }

    const getSelectOptions = (param) => {
        switch (param) {
            case 'method':
                return ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
            case 'target':
                return ['_self', '_blank', '_parent', '_top']
            case 'animationType':
                return ['fadeIn', 'fadeOut', 'slideIn', 'slideOut', 'bounce', 'pulse']
            case 'easing':
                return ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']
            default:
                return []
        }
    }

    const inputType = getInputType(param, actionType)
    const selectOptions = getSelectOptions(param)

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 capitalize">{param.replace(/([A-Z])/g, ' $1')}</label>
            {inputType === 'select' ? (
                <select
                    value={value || ''}
                    onChange={(e) => onChange(paramIndex, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select {param}...</option>
                    {selectOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={inputType}
                    value={value || ''}
                    onChange={(e) => onChange(paramIndex, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Enter ${param.toLowerCase()}...`}
                />
            )}
        </div>
    )
}

// Enhanced action row component with better visuals
const ActionRow = ({ action, actionIndex, eventType, nodeId, onRemove, totalActions, onMoveUp, onMoveDown }) => {
    const updateParams = useSetAtom(updateActionParamsAtom)
    const { actionType, actionParams } = action
    const actionMeta = ACTION_TYPES[actionType.toUpperCase().replace('-', '_')]
    const [isExpanded, setIsExpanded] = useState(true)

    const handleParamChange = (paramIndex, newValue) => {
        const newParams = [...(actionParams || [])]
        newParams[paramIndex] = newValue

        updateParams({
            nodeId,
            eventType,
            actionIndex,
            actionParams: newParams
        })
    }

    const getActionIcon = (actionType) => {
        switch (actionType) {
            case 'scroll-to':
                return '📜'
            case 'change-class':
            case 'change-style':
                return '🎨'
            case 'toggle-visibility':
                return '👁️'
            case 'set-prop':
                return '⚙️'
            case 'form-submission':
                return '📝'
            case 'navigate':
                return '🔗'
            case 'trigger-animation':
                return '✨'
            case 'show-modal':
            case 'hide-modal':
                return '📋'
            default:
                return '⚡'
        }
    }

    if (!actionMeta) {
        return (
            <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <div className="flex items-center gap-2 text-red-700">
                    <span>❌</span>
                    <span className="text-sm font-medium">Unknown action: {actionType}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Chain indicator */}
            <div className="flex items-center">
                <div className="flex flex-col items-center py-2 px-1 bg-blue-50 rounded-l-lg">
                    <span className="text-xs font-bold text-blue-600">#{actionIndex + 1}</span>
                    {actionIndex > 0 && <div className="w-0.5 h-4 bg-blue-300 mt-1"></div>}
                </div>

                <div className="flex-1 p-3">
                    {/* Action header */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{getActionIcon(actionType)}</span>
                            <div>
                                <div className="text-sm font-semibold text-gray-800">{actionMeta.name}</div>
                                <div className="text-xs text-gray-500">{actionMeta.description}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            {/* Move buttons */}
                            <button
                                onClick={() => onMoveUp(actionIndex)}
                                disabled={actionIndex === 0}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move up"
                            >
                                ⬆️
                            </button>
                            <button
                                onClick={() => onMoveDown(actionIndex)}
                                disabled={actionIndex === totalActions - 1}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move down"
                            >
                                ⬇️
                            </button>

                            {/* Expand/collapse */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-1 text-gray-400 hover:text-gray-600"
                                title={isExpanded ? "Collapse" : "Expand"}
                            >
                                {isExpanded ? '🔽' : '▶️'}
                            </button>

                            {/* Remove button */}
                            <button
                                onClick={() => onRemove(actionIndex)}
                                className="p-1 text-red-400 hover:text-red-600"
                                title="Remove action"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>

                    {/* Parameters */}
                    {isExpanded && actionMeta.params.length > 0 && (
                        <div className="space-y-3 mt-3 pt-3 border-t border-gray-100">
                            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Parameters</div>
                            <div className="grid gap-3">
                                {actionMeta.params.map((param, paramIndex) => (
                                    <ActionParamInput
                                        key={paramIndex}
                                        param={param}
                                        value={actionParams?.[paramIndex] || ''}
                                        onChange={handleParamChange}
                                        paramIndex={paramIndex}
                                        actionType={actionType}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Chain connector */}
                    {actionIndex < totalActions - 1 && (
                        <div className="flex items-center justify-center mt-3 pt-2">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="w-8 h-0.5 bg-gray-300"></div>
                                <span>THEN</span>
                                <div className="w-8 h-0.5 bg-gray-300"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Event section component
const EventSection = ({ eventType, nodeId }) => {
    const nodeActions = useAtomValue(nodeActionsAtomFamily(nodeId))
    const addAction = useSetAtom(addActionToEventAtom)
    const removeAction = useSetAtom(removeActionFromEventAtom)
    const moveAction = useSetAtom(moveActionAtom)
    const [isExpanded, setIsExpanded] = useState(false)
    const [selectedActionType, setSelectedActionType] = useState('')

    const eventActions = nodeActions[eventType] || []
    const hasActions = eventActions.length > 0

    const handleAddAction = () => {
        if (!selectedActionType) return

        const actionMeta = ACTION_TYPES[selectedActionType]
        if (!actionMeta) return

        // Initialize with empty parameters
        const emptyParams = actionMeta.params.map(() => '')

        addAction({
            nodeId,
            eventType,
            actionType: actionMeta.name,
            actionParams: emptyParams
        })

        setSelectedActionType('')
    }

    const handleRemoveAction = (actionIndex) => {
        removeAction({ nodeId, eventType, actionIndex })
    }

    const handleMoveUp = (actionIndex) => {
        if (actionIndex > 0) {
            moveAction({ nodeId, eventType, fromIndex: actionIndex, toIndex: actionIndex - 1 })
        }
    }

    const handleMoveDown = (actionIndex) => {
        if (actionIndex < eventActions.length - 1) {
            moveAction({ nodeId, eventType, fromIndex: actionIndex, toIndex: actionIndex + 1 })
        }
    }

    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-full flex items-center justify-between p-3 text-left rounded-t-lg ${hasActions ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
            >
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{eventType}</span>
                    {hasActions && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                            {eventActions.length}
                        </span>
                    )}
                </div>
                <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
            </button>

            {isExpanded && (
                <div className="p-3 space-y-3">
                    {/* Existing actions */}
                    {eventActions.map((action, index) => (
                        <ActionRow
                            key={index}
                            action={action}
                            actionIndex={index}
                            eventType={eventType}
                            nodeId={nodeId}
                            totalActions={eventActions.length}
                            onRemove={handleRemoveAction}
                            onMoveUp={handleMoveUp}
                            onMoveDown={handleMoveDown}
                        />
                    ))}

                    {/* Add new action */}
                    <div className="border-t border-gray-200 pt-3">
                        <div className="flex gap-2">
                            <select
                                value={selectedActionType}
                                onChange={(e) => setSelectedActionType(e.target.value)}
                                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                            >
                                <option value="">Select action...</option>
                                {Object.entries(ACTION_TYPES).map(([key, actionMeta]) => (
                                    <option key={key} value={key}>
                                        {actionMeta.name} - {actionMeta.description}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddAction}
                                disabled={!selectedActionType}
                                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// Main actions editor component
const ActionsEditor = ({ nodeId }) => {
    const previewMode = useAtomValue(previewModeAtom)
    const setPreviewMode = useSetAtom(previewModeAtom)

    return (
        <div className="space-y-4">
            {/* Preview mode toggle */}
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-yellow-800">Preview Mode</div>
                        <div className="text-xs text-yellow-600">
                            Enable to test actions in the editor
                        </div>
                    </div>
                    <button
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`px-3 py-1 text-sm rounded ${previewMode
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            }`}
                    >
                        {previewMode ? 'ON' : 'OFF'}
                    </button>
                </div>
            </div>

            {/* Event sections */}
            <div className="space-y-2">
                {Object.values(EVENT_TYPES).map((eventType) => (
                    <EventSection
                        key={eventType}
                        eventType={eventType}
                        nodeId={nodeId}
                    />
                ))}
            </div>
        </div>
    )
}

export default EditBar
