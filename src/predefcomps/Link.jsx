import { Link as RouterLink } from "react-router"
import { getCategorizedDefaultProps } from "./metadata"

export const Link = ({ content = {}, styling = {} }) => {
    // Get categorized default props from metadata
    const defaults = getCategorizedDefaultProps("Link")

    // Merge props with defaults for each category
    const finalContent = {
        text: content.text ?? defaults.content?.text,
        to: content.to ?? defaults.content?.to,
        target: content.target ?? defaults.content?.target
    }

    const finalStyling = {
        className: styling.className ?? defaults.styling?.className,
        fontSize: styling.fontSize ?? defaults.styling?.fontSize,
        fontWeight: styling.fontWeight ?? defaults.styling?.fontWeight,
        color: styling.color ?? defaults.styling?.color,
        textDecoration: styling.textDecoration ?? defaults.styling?.textDecoration,
        hoverColor: styling.hoverColor ?? defaults.styling?.hoverColor
    }

    // Build dynamic styles
    const dynamicStyles = {
        fontSize: `${finalStyling.fontSize}px`,
        fontWeight: finalStyling.fontWeight,
        color: finalStyling.color,
        textDecoration: finalStyling.textDecoration
    }

    const hoverStyles = {
        ':hover': {
            color: finalStyling.hoverColor
        }
    }

    // For external links, use regular anchor tag
    if (finalContent.to?.startsWith('http') || finalContent.target === '_blank') {
        return (
            <a
                id="user-link"
                href={finalContent.to}
                target={finalContent.target}
                className={finalStyling.className}
                style={dynamicStyles}
            >
                {finalContent.text}
            </a>
        )
    }

    // For internal links, use React Router Link
    return (
        <RouterLink
            id="user-link"
            to={finalContent.to}
            className={finalStyling.className}
            style={dynamicStyles}
        >
            {finalContent.text}
        </RouterLink>
    )
}
