import { useState } from "react"
import { treeSampleState } from "../static/components/simplestate"
import DnDRenderer from "../comptree/dndrenderer"

function EditorDnd() {
    const [treeState, setTreeState] = useState(treeSampleState)

    return (
        <>
            <DnDRenderer
                node={treeState}
                treeState={treeState}
                setTreeState={setTreeState}
            />
        </>
    )
}

export default EditorDnd
