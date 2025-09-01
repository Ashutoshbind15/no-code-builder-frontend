import { getCategorizedDefaultProps } from "./metadata"

export const Image = ({ content = {}, styling = {} }) => {
    // Get categorized default props from metadata
    const defaults = getCategorizedDefaultProps("Image")

    // Merge props with defaults for each category
    const finalContent = {
        src: content.src ?? defaults.content?.src,
        alt: content.alt ?? defaults.content?.alt,
        title: content.title ?? defaults.content?.title
    }

    const finalStyling = {
        className: styling.className ?? defaults.styling?.className,
        width: styling.width ?? defaults.styling?.width,
        height: styling.height ?? defaults.styling?.height,
        objectFit: styling.objectFit ?? defaults.styling?.objectFit,
        borderRadius: styling.borderRadius ?? defaults.styling?.borderRadius,
        border: styling.border ?? defaults.styling?.border,
        opacity: styling.opacity ?? defaults.styling?.opacity
    }

    // Build dynamic styles
    const dynamicStyles = {
        width: finalStyling.width,
        height: finalStyling.height,
        objectFit: finalStyling.objectFit,
        borderRadius: finalStyling.borderRadius,
        border: finalStyling.border,
        opacity: finalStyling.opacity
    }

    return (
        <img
            id="user-image"
            src={finalContent.src}
            alt={finalContent.alt}
            title={finalContent.title}
            className={finalStyling.className}
            style={dynamicStyles}
        />
    )
}
