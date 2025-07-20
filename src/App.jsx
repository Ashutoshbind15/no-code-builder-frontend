import { useStateStore } from "./comptree/statestore"
import { Renderer } from "./comptree/renderer"
import { starterState } from "./comptree/state"

function App() {

  const { setState } = useStateStore()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Renderer node={starterState.root} />
      <button onClick={() => setState("ctrval", 1)}>Initiate the ctr State</button>
    </div>
  )
}

export default App
