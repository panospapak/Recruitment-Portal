import { Link } from "react-router-dom";
import PageNavbar from "../components/PageNavbar";

function AdminHomePage() {
    return (
        <>
            <PageNavbar />

            <main className="admin-page">
                <section className="admin-header">
                    <p className="hi-label">Admin dashboard</p>

                    <h1>Manage the Hi-Tech platform</h1>

                    <p>
                        Create opportunities, manage applications and monitor
                        the recruitment experience across the platform.
                    </p>
                </section>

                <section className="admin-dashboard-grid">
                    <Link
                        to="/admin/create-job"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-icon">+</span>

                        <h2>Create Job</h2>

                        <p>
                            Publish a new opportunity for candidates.
                        </p>
                    </Link>

                    <Link
                        to="/admin/manage-jobs"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-icon">≡</span>

                        <h2>Manage Jobs</h2>

                        <p>
                            Edit, activate or remove job positions.
                        </p>
                    </Link>

                    <Link
                        to="/admin/applications"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-icon">✓</span>

                        <h2>Applications</h2>

                        <p>
                            Review candidate applications and statuses.
                        </p>
                    </Link>
                </section>
            </main>
        </>
    );
}

export default AdminHomePage;