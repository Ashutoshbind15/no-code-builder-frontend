import { useState } from "react"
import Sidebar from "../static/components/Sidebar"
import SimpleRenderer from "../static/components/simplestaterenderer"

const starterStructure = {
    id: "p:PageWrapper:0",
    children: [{
        id: "p:Literal:0.1",
    }]
}

const starterNodeEvals = {
    "p:PageWrapper:0": {
        props: {}
    }
}

const starterLiteralValues = {
    "p:Literal:0.1": "Hello, World!"
}

// for now the state change is controlled by the sidebar,
// later, when dnd, select tracking, and mouse events are added,
// we can change the tree state from within the renderer as well,
// we can refer to the dndeditor example for the same..
const EditorStatic = () => {

    const [treeState, setTreeState] = useState(starterStructure)
    const [nodeEvals, setNodeEvals] = useState(starterNodeEvals)
    const [literalValues, setLiteralValues] = useState(starterLiteralValues)


    return (
        <div className="flex w-full">
            <Sidebar />
            <div className="w-3/4 bg-blue-500 p-4">
                <SimpleRenderer node={treeState} evalsState={nodeEvals} literalValues={literalValues} />
            </div>
        </div>
    )
}

export default EditorStatic