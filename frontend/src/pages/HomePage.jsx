import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../services/jobService";

function HomePage() {
    const [jobs, setJobs] = useState([]);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data.slice(0, 4));
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/";
    };

    return (
        <div className="home-page">
            <section className="hi-hero">
                <nav className="hi-hero-nav">
                    <div className="hi-logo">
                        <span className="hi-logo-mark">H</span>
                        <span>Hi-Tech</span>
                    </div>

                    <div className="hi-nav-links">
                        {!token && (
                            <>
                                <Link to="/">Home</Link>

                                <Link to="/jobs">
                                    Opportunities
                                </Link>

                                <Link to="/login">
                                    Sign in
                                </Link>

                                <Link
                                    to="/register"
                                    className="hi-register"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        {token && role === "USER" && (
                            <>
                                <Link to="/">Home</Link>

                                <Link to="/jobs">
                                    Opportunities
                                </Link>

                                <Link to="/my-applications">
                                    My Applications
                                </Link>

                                <Link to="/profile">
                                    Profile
                                </Link>

                                <button
                                    className="hi-register"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {token && role === "ADMIN" && (
                            <>
                                <Link to="/admin">
                                    Admin Home
                                </Link>

                                <Link to="/jobs">
                                    Opportunities
                                </Link>

                                <Link to="/admin/create-job">
                                    Create Job
                                </Link>

                                <Link to="/admin/manage-jobs">
                                    Manage Jobs
                                </Link>

                                <Link to="/admin/applications">
                                    Applications
                                </Link>

                                <button
                                    className="hi-register"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </nav>

                <div className="hi-hero-content">
                    <div className="hi-hero-text">
                        <h1>
                            Technology
                            <br />
                            that shapes
                            <br />
                            <span>what’s next.</span>
                        </h1>

                        <p>
                            At Hi-Tech, we build innovative solutions that power
                            businesses and improve lives. Join a team of
                            builders, thinkers and doers.
                        </p>

                        <Link to="/jobs">
                            <button className="hi-primary-button">
                                View open roles →
                            </button>
                        </Link>

                        <div className="hi-offices">
                            <p>Our offices</p>

                            <span>Greece</span>
                            <span>•</span>
                            <span>Germany</span>
                            <span>•</span>
                            <span>Belgium</span>
                            <span>•</span>
                            <span>Remote</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="hi-openings">
                <div className="hi-section-header">
                    <div>
                        <p className="hi-label">
                            Open opportunities
                        </p>

                        <h2>
                            Find your next opportunity
                        </h2>
                    </div>

                    <Link
                        to="/jobs"
                        className="view-all-button"
                    >
                        View all opportunities
                    </Link>
                </div>

                <div className="hi-job-list">
                    {jobs.length === 0 && (
                        <div className="hi-job-row">
                            <strong>
                                No open opportunities yet.
                            </strong>
                        </div>
                    )}

                    {jobs.map((job) => (
                        <div
                            className="hi-job-row"
                            key={job.id}
                        >
                            <strong>
                                {job.title}
                            </strong>

                            <span>
                                {job.employmentType}
                            </span>

                            <span>
                                {job.location}
                            </span>

                            <Link
                                to={`/jobs/${job.id}`}
                                className="hi-job-arrow"
                            >
                                →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="hi-cv-box">
                <div>
                    <h2>
                        Don’t see the right opportunity?
                    </h2>

                    <p>
                        We’re always looking for talented people.
                        Send us your CV and let’s keep in touch.
                    </p>
                </div>

                <Link
                    to={
                        token
                            ? "/profile"
                            : "/register"
                    }
                >
                    <button className="hi-primary-button">
                        Send us your CV →
                    </button>
                </Link>
            </section>
        </div>
    );
}

export default HomePage;