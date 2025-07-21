export const Container = ({ children, className = "bg-red-500" }) => {
    return (
        <div id="user-container" className={className}>
            {children}
            <p>This is a container</p>
        </div>
    )
}