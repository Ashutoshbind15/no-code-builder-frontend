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

// where exactly do we want the defaults for the props to resolve?

// do we define a map of all the porps that a component takes, make them compulsary at the component level, and at runtime only, 
// do we define and pass all of them, acc to the defaults defined pre-hand...

// or do we also allow default props on the code level, so we dont necessarily need to pass all the props while creating/adding at runtime...

//any of the two, but one thing must not be allowed, i.e. adding a component without a compulsary prop...

// first one seems more logical, as it'd give predictable errors, and we anyways need to track the props


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