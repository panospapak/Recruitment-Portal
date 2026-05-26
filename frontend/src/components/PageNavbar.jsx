import { Link, useNavigate } from "react-router-dom";

function PageNavbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <nav className="page-navbar">
            <div
                className="hi-logo"
                onClick={() => navigate(role === "ADMIN" ? "/admin" : "/")}
            >
                <span className="hi-logo-mark">H</span>
                <span>Hi-Tech</span>
            </div>

            <div className="page-navbar-links">
                {!token && (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/jobs">Opportunities</Link>
                        <Link to="/login">Sign in</Link>
                        <Link to="/register" className="page-navbar-register">
                            Register
                        </Link>
                    </>
                )}

                {token && role === "USER" && (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/jobs">Opportunities</Link>
                        <Link to="/my-applications">My Applications</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}

                {token && role === "ADMIN" && (
                    <>
                        <Link to="/admin">Admin Home</Link>
                        <Link to="/jobs">Opportunities</Link>
                        <Link to="/admin/create-job">Create Job</Link>
                        <Link to="/admin/manage-jobs">Manage Jobs</Link>
                        <Link to="/admin/applications">Applications</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default PageNavbar;