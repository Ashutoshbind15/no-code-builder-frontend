import { Text } from "./Text"
import { getCategorizedDefaultProps } from "./metadata"

export const Card = ({ content = {}, containerStyles = {} }) => {
    // Get categorized default props from metadata
    const defaults = getCategorizedDefaultProps("Card")

    // Merge content props with defaults
    const finalContent = {
        title: content.title ?? defaults.content?.title,
        description: content.description ?? defaults.content?.description,
        image1: content.image1 ?? defaults.content?.image1
    }

    // Merge container styles with defaults
    const finalContainerStyles = {
        backgroundColor: containerStyles.backgroundColor ?? defaults.containerStyles?.backgroundColor,
        borderRadius: containerStyles.borderRadius ?? defaults.containerStyles?.borderRadius,
        padding: containerStyles.padding ?? defaults.containerStyles?.padding,
        margin: containerStyles.margin ?? defaults.containerStyles?.margin,
        boxShadow: containerStyles.boxShadow ?? defaults.containerStyles?.boxShadow,
        border: containerStyles.border ?? defaults.containerStyles?.border,
        opacity: containerStyles.opacity ?? defaults.containerStyles?.opacity,
        display: (containerStyles.visible ?? defaults.containerStyles?.visible) ? 'block' : 'none',
    }

    return (
        <div className="bg-blue-500" style={{ ...finalContainerStyles }}>
            <h1 id="card-title" className="text-2xl font-bold">{finalContent.title}</h1>
            <Text content={{ text: finalContent.description }} styling={{ className: "text-sm text-green-500" }} />
            <img src={finalContent.image1} alt="image1" />
        </div>
    )
}