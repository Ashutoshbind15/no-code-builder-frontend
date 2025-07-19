import { starterState } from "./comptree/state"
import { Renderer } from "./comptree/renderer"

function App() {

  return (
    <>
      <Renderer node={starterState.root} />
    </>
  )
}

export default App
