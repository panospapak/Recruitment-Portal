import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageNavbar from "../components/PageNavbar";
import { getJobs, getAllApplications } from "../services/jobService";

function AdminHomePage() {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const jobsData = await getJobs();
            const applicationsData = await getAllApplications();

            setJobs(jobsData);
            setApplications(applicationsData);
        } catch (error) {
            console.error(error);
        }
    };

    const activeJobs = jobs.filter((job) => job.active).length;

    const uniqueCandidates = new Set(
        applications.map((application) => application.user?.id)
    ).size;

    const recentApplications = applications.slice(0, 5);

    const statusCounts = {
        SUBMITTED: applications.filter(
            (a) => a.status === "SUBMITTED"
        ).length,

        UNDER_REVIEW: applications.filter(
            (a) => a.status === "UNDER_REVIEW"
        ).length,

        INTERVIEW: applications.filter(
            (a) => a.status === "INTERVIEW"
        ).length,

        ACCEPTED: applications.filter(
            (a) => a.status === "ACCEPTED"
        ).length,

        REJECTED: applications.filter(
            (a) => a.status === "REJECTED"
        ).length
    };

    const totalApplications = applications.length || 1;

    const submittedPercent =
        (statusCounts.SUBMITTED / totalApplications) * 100;

    const reviewPercent =
        (statusCounts.UNDER_REVIEW / totalApplications) * 100;

    const interviewPercent =
        (statusCounts.INTERVIEW / totalApplications) * 100;

    const acceptedPercent =
        (statusCounts.ACCEPTED / totalApplications) * 100;

    return (
        <>
            <PageNavbar />

            <main className="admin-page">
                <section className="admin-header">
                    <p className="hi-label">
                        Admin dashboard
                    </p>

                    <h1>
                        Welcome back, admin
                    </h1>

                    <p>
                        Here’s an overview of your
                        recruitment platform and
                        recent candidate activity.
                    </p>
                </section>

                <section className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <span>Total Opportunities</span>
                        <strong>{jobs.length}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Total Applications</span>
                        <strong>{applications.length}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Active Roles</span>
                        <strong>{activeJobs}</strong>
                    </div>

                    <div className="admin-stat-card">
                        <span>Candidates</span>
                        <strong>{uniqueCandidates}</strong>
                    </div>
                </section>

                <section className="admin-dashboard-layout">
                    <div className="admin-dashboard-left">
                        <div className="admin-actions-panel">
                            <h2>
                                Quick actions
                            </h2>

                            <div className="admin-actions-grid">
                                <Link
                                    to="/admin/create-job"
                                    className="admin-action-card"
                                >
                                    <span>＋</span>

                                    <h3>
                                        Create Job
                                    </h3>
                                </Link>

                                <Link
                                    to="/admin/manage-jobs"
                                    className="admin-action-card"
                                >
                                    <span>≡</span>

                                    <h3>
                                        Manage Jobs
                                    </h3>
                                </Link>

                                <Link
                                    to="/admin/applications"
                                    className="admin-action-card"
                                >
                                    <span>✓</span>

                                    <h3>
                                        Applications
                                    </h3>
                                </Link>
                            </div>
                        </div>

                        <div className="admin-dashboard-box">
                            <div className="dashboard-box-header">
                                <h2>
                                    Recent opportunities
                                </h2>

                                <Link to="/admin/manage-jobs">
                                    View all
                                </Link>
                            </div>

                            <div className="recent-jobs-list">
                                {jobs
                                    .slice(0, 5)
                                    .map((job) => (
                                        <div
                                            className="recent-job-item"
                                            key={job.id}
                                        >
                                            <div>
                                                <strong>
                                                    {job.title}
                                                </strong>

                                                <p>
                                                    {job.location}
                                                    {" • "}
                                                    {job.employmentType}
                                                </p>
                                            </div>

                                            <span>
                                                {
                                                    applications.filter(
                                                        (
                                                            application
                                                        ) =>
                                                            application
                                                                .jobPosition
                                                                .id ===
                                                            job.id
                                                    ).length
                                                }{" "}
                                                applications
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="admin-dashboard-right">
                        <div className="admin-dashboard-box">
                            <div className="dashboard-box-header">
                                <h2>
                                    Application status
                                </h2>
                            </div>

                            <div
                                className="status-donut"
                                style={{
                                    background: `conic-gradient(
                                        #f59e0b 0 ${submittedPercent}%,
                                        #6366f1 ${submittedPercent}% ${submittedPercent + reviewPercent}%,
                                        #2563eb ${submittedPercent + reviewPercent}% ${submittedPercent + reviewPercent + interviewPercent}%,
                                        #16a34a ${submittedPercent + reviewPercent + interviewPercent}% ${submittedPercent + reviewPercent + interviewPercent + acceptedPercent}%,
                                        #dc2626 ${submittedPercent + reviewPercent + interviewPercent + acceptedPercent}% 100%
                                    )`
                                }}
                            >
                                <div>
                                    <strong>
                                        {applications.length}
                                    </strong>

                                    <span>
                                        Total
                                    </span>
                                </div>
                            </div>

                            <div className="status-legend">
                                <p>
                                    <span className="dot submitted"></span>

                                    Submitted ·{" "}
                                    {statusCounts.SUBMITTED}
                                </p>

                                <p>
                                    <span className="dot review"></span>

                                    Under review ·{" "}
                                    {
                                        statusCounts.UNDER_REVIEW
                                    }
                                </p>

                                <p>
                                    <span className="dot interview"></span>

                                    Interview ·{" "}
                                    {statusCounts.INTERVIEW}
                                </p>

                                <p>
                                    <span className="dot accepted"></span>

                                    Accepted ·{" "}
                                    {statusCounts.ACCEPTED}
                                </p>

                                <p>
                                    <span className="dot rejected"></span>

                                    Rejected ·{" "}
                                    {statusCounts.REJECTED}
                                </p>
                            </div>
                        </div>

                        <div className="admin-dashboard-box recent-applications-box">
                            <div className="dashboard-box-header">
                                <h2>
                                    Recent applications
                                </h2>

                                <Link to="/admin/applications">
                                    View all
                                </Link>
                            </div>

                            <div className="recent-applications-list">
                                {recentApplications.map(
                                    (application) => (
                                        <div
                                            className="recent-application-item"
                                            key={application.id}
                                        >
                                            
                                            <div>
                                                <strong>
                                                    {
                                                        application
                                                            .jobPosition
                                                            .title
                                                    }
                                                </strong>

                                                <p>
                                                    {
                                                        application
                                                            .user
                                                            .email
                                                    }
                                                </p>
                                            </div>

                                            <span
                                                className={`status-badge ${application.status.toLowerCase()}`}
                                            >
                                                {
                                                    application.status
                                                }
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default AdminHomePage;