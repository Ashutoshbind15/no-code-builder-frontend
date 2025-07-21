export const Text = ({ text = "Hello", style = "body" }) => {
    if (style === "heading") {
        return <div className="text-2xl font-bold">{text}</div>
    } else if (style === "subheading") {
        return <div className="text-xl font-bold">{text}</div>
    } else if (style === "body") {
        return <div className="text-xl">{text}</div>
    } else {
        return <div className="text-sm">{text}</div>
    }
}