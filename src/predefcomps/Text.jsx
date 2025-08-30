import { getCategorizedDefaultProps } from "./metadata"

export const Text = ({ content = {}, styling = {} }) => {
    // Get categorized default props from metadata
    const defaults = getCategorizedDefaultProps("Text")

    // Merge props with defaults for each category
    const finalContent = {
        text: content.text ?? defaults.content?.text
    }

    const finalStyling = {
        className: styling.className ?? defaults.styling?.className,
        fontSize: styling.fontSize ?? defaults.styling?.fontSize,
        bold: styling.bold ?? defaults.styling?.bold,
        italic: styling.italic ?? defaults.styling?.italic
    }

    // Build dynamic styles
    const dynamicStyles = {
        fontSize: `${finalStyling.fontSize}px`,
        fontWeight: finalStyling.bold ? 'bold' : 'normal',
        fontStyle: finalStyling.italic ? 'italic' : 'normal'
    }

    return (
        <p id="user-text" className={finalStyling.className} style={dynamicStyles}>
            {finalContent.text}
        </p>
    )
}