import { NavLink, Outlet } from "react-router"

export const Layout = () => {
    return (
        <div>
            <nav>
                <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500" : "text-blue-500"}>Home</NavLink>
                <NavLink to="/old" className={({ isActive }) => isActive ? "text-red-500" : "text-blue-500"}>Old</NavLink>
                <NavLink to="/dndtest" className={({ isActive }) => isActive ? "text-red-500" : "text-blue-500"}>Dnd Test</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}