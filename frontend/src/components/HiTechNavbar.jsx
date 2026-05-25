import { Link, useNavigate } from "react-router-dom";

function HiTechNavbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <nav className="hi-navbar">
            <div className="hi-logo" onClick={() => navigate("/")}>
                <span className="hi-logo-mark">H</span>
                <span>Hi-Tech</span>
            </div>

            <div className="hi-navbar-links">
                <Link to="/">Home</Link>
                <Link to="/jobs">Opportunities</Link>

                {!token && (
                    <>
                        <Link to="/login">Sign in</Link>
                        <Link to="/register" className="hi-navbar-register">
                            Register
                        </Link>
                    </>
                )}

                {token && role === "USER" && (
                    <>
                        <Link to="/my-applications">My Applications</Link>
                        <Link to="/profile">Profile</Link>
                        <button className="hi-navbar-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}

                {token && role === "ADMIN" && (
                    <>
                        <Link to="/admin">Admin Home</Link>
                        <Link to="/admin/create-job">Create Job</Link>
                        <Link to="/admin/manage-jobs">Manage Jobs</Link>
                        <Link to="/admin/applications">Applications</Link>
                        <button className="hi-navbar-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default HiTechNavbar;