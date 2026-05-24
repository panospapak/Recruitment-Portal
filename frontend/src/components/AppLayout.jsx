import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout({ children }) {
    const location = useLocation();

    const hideNavbar =
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/profile";

    return (
        <>
            {!hideNavbar && <Navbar />}
            {children}
        </>
    );
}

export default AppLayout;