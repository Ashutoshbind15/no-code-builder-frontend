export const Text = ({ text, className = "text-sm text-gray-500" }) => {
    return (
        <p id="user-text" className={className}>{text}</p>
    )
}