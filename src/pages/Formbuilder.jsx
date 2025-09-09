import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Formbuilder = () => {
    const [fieldName, setFieldName] = useState("")
    const [fieldType, setFieldType] = useState("text")
    const [fields, setFields] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleAddField = () => {
        if (fieldName.trim()) {
            const newField = {
                fieldName: fieldName.trim(),
                fieldType: fieldType
            }
            setFields([...fields, newField])
            setFieldName("")
            setFieldType("text")
            setIsDialogOpen(false)
        }
    }

    return (
        <div className="p-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>Add Field</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Field</DialogTitle>
                        <DialogDescription>
                            Enter the field name and select the field type.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="fieldName" className="text-sm font-medium">
                                Field Name
                            </label>
                            <Input
                                id="fieldName"
                                value={fieldName}
                                onChange={(e) => setFieldName(e.target.value)}
                                placeholder="Enter field name"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="fieldType" className="text-sm font-medium">
                                Field Type
                            </label>
                            <Select value={fieldType} onValueChange={setFieldType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select field type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAddField}>Add Field</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Display current fields for debugging */}
            {fields.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Current Fields:</h3>
                    <ul className="space-y-1">
                        {fields.map((field) => (
                            <li key={field.fieldName} className="text-sm">
                                {field.fieldName} ({field.fieldType})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Form fields={fields} />
        </div>
    )
}

/**
 * @typedef {Object} Field
 * @property {string} fieldName - The name of the field.
 * @property {string} fieldType - The type of the field (e.g., "text", "email", "number").
 */

/**
 * @param {{ fields: Field[] }} props
 */
const Form = ({ fields }) => {
    const { handleSubmit, register } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
                <div key={field.fieldName}>
                    <label htmlFor={field.fieldName}>{field.fieldName}</label>
                    <FormInputRenderer field={field} register={register} />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    )
}

const FormInputRenderer = ({ field, register }) => {
    if (field.fieldType === "text") {
        return <input type="text" {...register(field.fieldName)} />
    } else if (field.fieldType === "email") {
        return <input type="email" {...register(field.fieldName)} />
    } else if (field.fieldType === "number") {
        return <input type="number" {...register(field.fieldName)} />
    }
}

export default Formbuilder