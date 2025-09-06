import { memo, useState } from "react"
import { useAtomValue, useSetAtom } from 'jotai'
import { getCategorizedProps } from "../../predefcomps/metadata"
import { selectedElementAtom, nodePropsAtomFamily, updateNodePropsAtom } from "../atoms"
import { getPropEditor } from "../../predefcomps/propEditors"
import PublishButton from "../../components/PublishButton"

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
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Properties</h3>
                    <PropsEditor nodeId={selectedElement} />
                </div>

                {/* Publish Button */}
                <PublishButton />
            </div>
        </div>
    )
}

export default EditBar
