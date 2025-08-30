import { useEffect } from "react"
import { useAtomValue, useSetAtom } from 'jotai'
import { Provider } from 'jotai'
import Sidebar from "../static/components/Sidebar"
import EditBar from "../static/components/EditBar"
import SimpleRenderer from "../static/components/simplestaterenderer"
import { getCategorizedDefaultProps } from "../predefcomps/metadata"
import { rootNodeIdAtom, initializeTreeAtom } from "../static/atoms"

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
        <div className="flex w-full">
            <Sidebar />
            <div className="w-2/4 bg-blue-500 p-4">
                {rootNodeId && <SimpleRenderer nodeId={rootNodeId} />}
            </div>
            <EditBar />
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