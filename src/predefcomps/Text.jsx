import { getCategorizedDefaultProps } from "./metadata"

export const Text = ({ content = {}, styling = {} }) => {
    // Get categorized default props from metadata
    const defaults = getCategorizedDefaultProps("Text")

    // Merge props with defaults for each category
    const finalContent = {
        text: content.text ?? defaults.content?.text
    }

    const finalStyling = {
        className: styling.className ?? defaults.styling?.className
    }

    return (
        <p id="user-text" className={finalStyling.className}>{finalContent.text}</p>
    )
}