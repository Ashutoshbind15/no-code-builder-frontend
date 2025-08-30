import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import ElementAdderForm from './ElementAdderForm'

// Specialized dialog for adding elements - now uses atoms
const AddElementDialog = ({ parentNodeId, children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Element</DialogTitle>
                </DialogHeader>
                <ElementAdderForm parentNodeId={parentNodeId} />
            </DialogContent>
        </Dialog>
    )
}

export default AddElementDialog
