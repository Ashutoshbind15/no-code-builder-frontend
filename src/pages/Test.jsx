import { useState } from "react"

const TestPage = () => {

    const [color, setColor] = useState("#000000")

    return (<>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        {color}
    </>)
}

export default TestPage