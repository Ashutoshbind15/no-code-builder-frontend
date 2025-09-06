import { useEffect } from "react"
import { useAtomValue, useSetAtom } from 'jotai'
import { Provider } from 'jotai'
import Sidebar from "../static/components/Sidebar"
import EditBar from "../static/components/EditBar"
import SimpleRenderer from "../static/components/simplestaterenderer"
import { getCategorizedDefaultProps } from "../predefcomps/metadata"
import { rootNodeIdAtom, initializeTreeAtom, previewModeAtom } from "../static/atoms"

const starterStructure = {
    id: "PageWrapper:0",
    children: [{
        id: "Card:0.1",
        children: []
    }, {
        id: "Text:0.2",
        children: []
    }]
}

// Generate starter node evaluations using metadata defaults
const generateStarterNodeEvals = () => {
    const pageWrapperDefaults = getCategorizedDefaultProps("PageWrapper")
    const cardDefaults = getCategorizedDefaultProps("Card")
    const textDefaults = getCategorizedDefaultProps("Text")

    return {
        "PageWrapper:0": {
            props: pageWrapperDefaults
        },
        "Card:0.1": {
            props: cardDefaults
        },
        "Text:0.2": {
            props: textDefaults
        }
    }
}

const starterNodeEvals = generateStarterNodeEvals()

// Preview mode header component
const PreviewModeHeader = () => {
    const previewMode = useAtomValue(previewModeAtom)
    const setPreviewMode = useSetAtom(previewModeAtom)

    return (
        <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-gray-800">No-Code Builder</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Mode:</span>
                    <button
                        onClick={() => setPreviewMode(false)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${!previewMode
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setPreviewMode(true)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${previewMode
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Preview
                    </button>
                </div>
            </div>

            {previewMode && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Preview Mode Active - Actions Enabled</span>
                </div>
            )}
        </div>
    )
}

// Inner component that uses atoms
const EditorContent = () => {
    const rootNodeId = useAtomValue(rootNodeIdAtom)
    const initializeTree = useSetAtom(initializeTreeAtom)

    useEffect(() => {
        // Initialize the tree with starter data
        initializeTree({
            starterStructure,
            starterNodeEvals
        })
    }, [initializeTree])

    return (
        <div className="flex flex-col h-screen">
            <PreviewModeHeader />
            <div className="flex flex-1">
                <Sidebar />
                <div className="w-2/4 bg-blue-500 p-4">
                    {rootNodeId && <SimpleRenderer nodeId={rootNodeId} />}
                </div>
                <EditBar />
            </div>
        </div>
    )
}

// All components are now custom components with categorized props
// No HTML elements or literals - simplified architecture
// Now uses Jotai for optimized state management
const EditorStatic = () => {
    return (
        <Provider>
            <EditorContent />
        </Provider>
    )
}

export default EditorStatic