import { useStateStore } from "./comptree/statestore"
import { Renderer } from "./comptree/renderer"
import { starterState, testState } from "./comptree/state"
import { useState } from "react"

function App() {

  const { setState } = useStateStore()

  const [treeState, setTreeState] = useState(starterState)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Renderer node={treeState.root} />
      <button onClick={() => setState("ctrval", 1)}>Initiate the ctr State</button>
      <button onClick={() => setTreeState(testState)}>Change state test</button>
    </div>
  )
}

export default App
