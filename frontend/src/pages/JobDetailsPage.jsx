import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    getJobById,
    applyToJob,
    getMyApplications
} from "../services/jobService";
import PageNavbar from "../components/PageNavbar";

function JobDetailsPage() {
    const { id } = useParams();
    const role = localStorage.getItem("role");

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [applied, setApplied] = useState(false);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    const fetchJobDetails = async () => {
        try {
            const jobData = await getJobById(id);
            setJob(jobData);

            const token = localStorage.getItem("token");

            if (token && role !== "ADMIN") {
                const applications = await getMyApplications();

                const hasApplied = applications.some(
                    (application) =>
                        application.jobPosition.id === Number(id)
                );

                setApplied(hasApplied);
            }
        } catch (error) {
            setMessage("Failed to load job details.");
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please sign in before applying.");
            return;
        }

        if (role === "ADMIN") {
            return;
        }

        if (applied) {
            return;
        }

        try {
            setApplying(true);

            await applyToJob(job.id);

            setApplied(true);
            setMessage("Application submitted successfully!");
        } catch (error) {
            if (
                error.response?.data?.message
                    ?.toLowerCase()
                    .includes("already")
            ) {
                setApplied(true);
                setMessage("");
                return;
            }

            setMessage(error.response?.data?.message || "Application failed.");
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <>
                <PageNavbar />
                <p className="page">Loading job...</p>
            </>
        );
    }

    if (!job) {
        return (
            <>
                <PageNavbar />
                <div className="page">
                    <h1>Job not found</h1>
                    <Link to="/jobs">Back to opportunities</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <PageNavbar />

            <div className="job-details-page">
                <Link to="/jobs" className="back-link">
                    ← Back to opportunities
                </Link>

                <div
                    className={
                        role === "ADMIN"
                            ? "job-details-layout admin-view"
                            : "job-details-layout"
                    }
                >
                    <main className="job-details-main">
                        <p className="hi-label">Open opportunity</p>

                        <h1>{job.title}</h1>

                        <div className="job-meta">
                            <span>{job.location}</span>
                            <span>{job.employmentType}</span>
                            <span>
                                {job.active ? "Open role" : "Closed role"}
                            </span>
                        </div>

                        <section>
                            <h2>About the role</h2>
                            <p>{job.description}</p>
                        </section>

                        <section>
                            <h2>What you will do</h2>
                            <ul>
                                <li>Build reliable and scalable software solutions.</li>
                                <li>Collaborate with product, design and engineering teams.</li>
                                <li>Contribute to clean architecture and maintainable code.</li>
                                <li>Improve user experience through thoughtful technical decisions.</li>
                            </ul>
                        </section>

                        <section>
                            <h2>What we value</h2>
                            <ul>
                                <li>Problem-solving mindset.</li>
                                <li>Ownership and clear communication.</li>
                                <li>Interest in modern technologies and continuous learning.</li>
                            </ul>
                        </section>
                    </main>

                    {role !== "ADMIN" && (
                        <aside className="job-apply-card">
                            <h2>
                                {applied
                                    ? "Application submitted"
                                    : "Apply for this role"}
                            </h2>

                            <p>
                                {applied
                                    ? "You have already applied for this role. You can track it from your applications page."
                                    : "Submit your application and track its progress from your candidate dashboard."}
                            </p>

                            {message && (
                                <p className="job-message">{message}</p>
                            )}

                            <button
                                onClick={handleApply}
                                disabled={applied || applying}
                                className={applied ? "applied-button" : ""}
                            >
                                {applied
                                    ? "Applied"
                                    : applying
                                        ? "Applying..."
                                        : "Apply now"}
                            </button>

                            <Link to="/profile">
                                Update your profile
                            </Link>
                        </aside>
                    )}
                </div>
            </div>
        </>
    );
}

export default JobDetailsPage;