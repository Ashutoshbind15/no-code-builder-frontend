import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import ElementAdderForm from './ElementAdderForm'

// Specialized dialog for adding elements
const AddElementDialog = ({ parentNodeId, setEvalsState, setLiteralValues, setTreeState, children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Element</DialogTitle>
                </DialogHeader>
                <ElementAdderForm
                    parentNodeId={parentNodeId}
                    setEvalsState={setEvalsState}
                    setLiteralValues={setLiteralValues}
                    setTreeState={setTreeState}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AddElementDialog
