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
        fontWeight: styling.fontWeight ?? defaults.styling?.fontWeight,
        fontStyle: styling.fontStyle ?? defaults.styling?.fontStyle,
        color: styling.color ?? defaults.styling?.color,
        textAlign: styling.textAlign ?? defaults.styling?.textAlign,
        lineHeight: styling.lineHeight ?? defaults.styling?.lineHeight,
        letterSpacing: styling.letterSpacing ?? defaults.styling?.letterSpacing,
        textDecoration: styling.textDecoration ?? defaults.styling?.textDecoration,
        textTransform: styling.textTransform ?? defaults.styling?.textTransform,
        element: styling.element ?? defaults.styling?.element
    }

    // Build dynamic styles
    const dynamicStyles = {
        fontSize: `${finalStyling.fontSize}px`,
        fontWeight: finalStyling.fontWeight,
        fontStyle: finalStyling.fontStyle,
        color: finalStyling.color,
        textAlign: finalStyling.textAlign,
        lineHeight: finalStyling.lineHeight,
        letterSpacing: finalStyling.letterSpacing,
        textDecoration: finalStyling.textDecoration,
        textTransform: finalStyling.textTransform
    }

    // Determine which HTML element to use
    const ElementType = finalStyling.element

    return (
        <ElementType id="user-text" className={finalStyling.className} style={dynamicStyles}>
            {finalContent.text}
        </ElementType>
    )
}