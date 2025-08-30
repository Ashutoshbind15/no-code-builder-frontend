import { getCategorizedDefaultProps } from "./metadata"

export const Container = ({ children, styling = {} }) => {
    // Get categorized default props from metadata
    const defaults = getCategorizedDefaultProps("Container")

    // Merge props with defaults for each category
    const finalStyling = {
        className: styling.className ?? defaults.styling?.className
    }

    return (
        <div id="user-container" className={finalStyling.className}>
            {children}
            <p>This is a container</p>
        </div>
    )
}