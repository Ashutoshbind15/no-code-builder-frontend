import { useState } from "react"
import { useCustomComponentStore, useStateStore } from "../comptree/statestore"
import { customStarterState } from "../comptree/customstate"
import { CustomRenderer } from "../comptree/customrenderer"

function App() {

  const { setState } = useStateStore()
  const [treeState, _] = useState(customStarterState)
  const { isLoading } = useCustomComponentStore()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoading ? <div>Loading...</div> : <CustomRenderer node={treeState.root} />}
      <button onClick={() => setState("ctrval", 1)}>Initiate the ctr State</button>
    </div>
  )
}

export default App
