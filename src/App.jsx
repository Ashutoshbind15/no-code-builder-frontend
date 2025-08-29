import { treeSampleState } from "./comptree/simplestate"
import SimpleRenderer from "./comptree/simplestaterenderer"

function App() {

  return <>
    <SimpleRenderer node={treeSampleState} />
  </>
}

export default App
