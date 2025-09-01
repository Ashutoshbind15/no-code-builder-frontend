import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

// Base prop editor components that can be used by specific component editors
export const PropEditorComponents = {
    StringInput: ({ value, onChange, placeholder, className = "" }) => (
        <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`flex-1 text-sm border border-gray-300 rounded px-2 py-1 ml-2 ${className}`}
            placeholder={placeholder}
        />
    ),

    NumberInput: ({ value, onChange, placeholder, min, max, step = 1, className = "" }) => (
        <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className={`flex-1 text-sm border border-gray-300 rounded px-2 py-1 ml-2 ${className}`}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
        />
    ),

    BooleanInput: ({ value, onChange, className = "" }) => (
        <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className={`ml-2 ${className}`}
        />
    ),

    EnumSelect: ({ value, onChange, options, placeholder = "Select...", className = "" }) => (
        <div className={`flex-1 ml-2 ${className}`}>
            <Select value={value || ''} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    ),

    ColorInput: ({ value, onChange, className = "" }) => {
        return (
            <div className={`flex items-center ml-2 gap-2 ${className}`}>
                <input
                    type="color"
                    value={value || '#000000'}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                    title="Pick a color"
                />
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 text-sm border border-gray-300 rounded px-2 py-1"
                    placeholder="#000000"
                />
            </div>
        )
    },

    TextareaInput: ({ value, onChange, placeholder, rows = 3, className = "" }) => (
        <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`flex-1 text-sm border border-gray-300 rounded px-2 py-1 ml-2 ${className}`}
            placeholder={placeholder}
            rows={rows}
        />
    )
}



// Function to get the appropriate prop editor component
export const getPropEditor = (propMeta) => {
    // Check if the prop has enum options
    if (propMeta.options && Array.isArray(propMeta.options)) {
        return (props) => <PropEditorComponents.EnumSelect {...props} options={propMeta.options} />
    }

    // Use standard editors based on type
    switch (propMeta.type) {
        case 'boolean':
            return PropEditorComponents.BooleanInput
        case 'number':
            return (props) => <PropEditorComponents.NumberInput {...props}
                min={propMeta.min}
                max={propMeta.max}
                step={propMeta.step}
            />
        case 'color':
            return PropEditorComponents.ColorInput
        case 'textarea':
            return (props) => <PropEditorComponents.TextareaInput {...props} rows={propMeta.rows} />
        case 'string':
        default:
            return PropEditorComponents.StringInput
    }
}
