import { Link } from "react-router-dom";

function AdminHomePage() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Choose what you want to manage.</p>

            <ul>
                <li><Link to="/admin/create-job">Create Jobs</Link></li>
                <li><Link to="/admin/manage-jobs">Manage Jobs</Link></li>
                <li><Link to="/admin/applications">Applications</Link></li>
            </ul>
        </div>
    );
}

export default AdminHomePage;