import { Link } from "react-router-dom";

function UserHomePage() {
    return (
        <div>
            <h1>User Dashboard</h1>
            <p>Welcome to your candidate area.</p>

            <ul>
                <li><Link to="/jobs">View Jobs</Link></li>
                <li><Link to="/my-applications">My Applications</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </div>
    );
}

export default UserHomePage;