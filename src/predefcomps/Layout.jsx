import { getCategorizedDefaultProps } from "./metadata"

export const Layout = ({ children, layout = {}, styling = {} }) => {
    // Get categorized default props from metadata
    const defaults = getCategorizedDefaultProps("Layout")

    // Merge props with defaults for each category
    const finalLayout = {
        direction: layout.direction ?? defaults.layout?.direction,
        justifyContent: layout.justifyContent ?? defaults.layout?.justifyContent,
        alignItems: layout.alignItems ?? defaults.layout?.alignItems,
        gap: layout.gap ?? defaults.layout?.gap,
        wrap: layout.wrap ?? defaults.layout?.wrap
    }

    const finalStyling = {
        className: styling.className ?? defaults.styling?.className,
        width: styling.width ?? defaults.styling?.width,
        height: styling.height ?? defaults.styling?.height,
        padding: styling.padding ?? defaults.styling?.padding,
        margin: styling.margin ?? defaults.styling?.margin,
        backgroundColor: styling.backgroundColor ?? defaults.styling?.backgroundColor,
        borderRadius: styling.borderRadius ?? defaults.styling?.borderRadius,
        border: styling.border ?? defaults.styling?.border
    }

    // Build dynamic styles
    const dynamicStyles = {
        display: 'flex',
        flexDirection: finalLayout.direction,
        justifyContent: finalLayout.justifyContent,
        alignItems: finalLayout.alignItems,
        gap: finalLayout.gap,
        flexWrap: finalLayout.wrap,
        width: finalStyling.width,
        height: finalStyling.height,
        padding: finalStyling.padding,
        margin: finalStyling.margin,
        backgroundColor: finalStyling.backgroundColor,
        borderRadius: finalStyling.borderRadius,
        border: finalStyling.border
    }

    return (
        <div
            id="user-layout"
            className={finalStyling.className}
            style={dynamicStyles}
        >
            {children}
        </div>
    )
}
