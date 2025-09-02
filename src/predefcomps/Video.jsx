import { getCategorizedDefaultProps } from "./metadata"

export const Video = ({ content = {}, styling = {} }) => {
    // Get categorized default props from metadata
    const defaults = getCategorizedDefaultProps("Video")

    // Merge props with defaults for each category
    const finalContent = {
        src: content.src ?? defaults.content?.src,
        poster: content.poster ?? defaults.content?.poster,
        controls: content.controls ?? defaults.content?.controls,
        autoplay: content.autoplay ?? defaults.content?.autoplay,
        loop: content.loop ?? defaults.content?.loop,
        muted: content.muted ?? defaults.content?.muted
    }

    const finalStyling = {
        className: styling.className ?? defaults.styling?.className,
        width: styling.width ?? defaults.styling?.width,
        height: styling.height ?? defaults.styling?.height,
        borderRadius: styling.borderRadius ?? defaults.styling?.borderRadius,
        border: styling.border ?? defaults.styling?.border,
        opacity: styling.opacity ?? defaults.styling?.opacity
    }

    // Build dynamic styles
    const dynamicStyles = {
        width: finalStyling.width,
        height: finalStyling.height,
        borderRadius: finalStyling.borderRadius,
        border: finalStyling.border,
        opacity: finalStyling.opacity
    }

    return (
        <video
            id="user-video"
            src={finalContent.src}
            poster={finalContent.poster}
            controls={finalContent.controls}
            autoPlay={finalContent.autoplay}
            loop={finalContent.loop}
            muted={finalContent.muted}
            className={finalStyling.className}
            style={dynamicStyles}
        />
    )
}
