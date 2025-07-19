import { starterState } from "./comptree/state"
import { Renderer } from "./comptree/renderer"
import Dnd from "./components/test/dnd"
import Treednd from "./components/test/treednd"

function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Treednd />
    </div>
  )
}

export default App
