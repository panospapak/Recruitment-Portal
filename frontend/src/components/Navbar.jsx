import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    if (!token) {
        return (
            <nav>
                <Link to="/jobs">Jobs</Link>
                {" | "}
                <Link to="/login">Login</Link>
                {" | "}
                <Link to="/register">Register</Link>
            </nav>
        );
    }

    if (role === "USER") {
        return (
            <nav>
                <Link to="/jobs">Jobs</Link>
                {" | "}
                <Link to="/my-applications">My Applications</Link>
                {" | "}
                <Link to="/profile">Profile</Link>
                {" | "}
                <button onClick={handleLogout}>Logout</button>
            </nav>
        );
    }

    if (role === "ADMIN") {
        return (
            <nav>
                <Link to="/admin/create-job">Create Jobs</Link>
                {" | "}
                <Link to="/admin/manage-jobs">Manage Jobs</Link>
                {" | "}
                <Link to="/admin/applications">Applications</Link>
                {" | "}
                <button onClick={handleLogout}>Logout</button>
            </nav>
        );
    }

    return null;
}

export default Navbar;