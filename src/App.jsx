import { useState } from "react"
import { treeSampleState } from "./comptree/simplestate"
import DnDRenderer from "./comptree/dndrenderer"

function App() {
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

export default App
