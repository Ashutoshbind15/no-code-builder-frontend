import { atom, useAtomValue } from "jotai"
import { nodeActionsAtomFamily } from "../static/atoms"

const isPreviewAtom = atom(false)

const hofWrapper = (isPressable, params) => {
    if (!isPressable) {
        return () => { }
    } else {
        return hof(params)
    }
}

const hof = (params) => {
    const action = params.action

    if (action === "form-submission") {
        return () => {

            const formId = params.formId;

            // find the form data from the global state with the formId

            // call external apis
        }
    }

    return () => {
        console.log("child clicked")
    }
}

const ChildButton = ({ nodeId }) => {

    const isPreview = useAtomValue(isPreviewAtom)

    // get the action params for the nodeId
    // const actionParams = use

    return <button onClick={hofWrapper(isPreview)}>Click me</button>
}

const OnClickWrapper = ({ children, nodeId }) => {

    const isPreview = useAtomValue(isPreviewAtom)
    const nodeActions = useAtomValue(nodeActionsAtomFamily(nodeId))

    const actionObjects = {}

    // Process node actions here if needed
    // for (let action in nodeActions) {
    //     // Process each action
    // }

    return <div onClick={hofWrapper(isPreview)}>{children}</div>
}

const TestPage = () => {
    return (<>
        <SelectionWrapper>
            <ChildButton isPressable={false} />
        </SelectionWrapper>
    </>)
}

export default TestPage