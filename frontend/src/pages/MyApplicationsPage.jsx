import { useEffect, useState } from "react";
import { getMyApplications } from "../services/jobService";
import { getMyNotifications, markNotificationsAsRead } from "../services/notificationService";
import PageNavbar from "../components/PageNavbar";

function MyApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPageData();
    }, []);

    const fetchPageData = async () => {
        try {
            const applicationsData = await getMyApplications();
            const notificationsData = await getMyNotifications();

            setApplications(applicationsData);
            setNotifications(notificationsData);
            await markNotificationsAsRead();
        } catch (error) {
            alert("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageNavbar />

            <div className="applications-page">
                <div className="applications-header">
                    <p className="hi-label">Candidate area</p>

                    <h1>My Applications</h1>

                    <p>
                        Track the status of your applications and stay updated
                        with your recruitment process at Hi-Tech.
                    </p>
                </div>

                {notifications.length > 0 && (
                    <section className="notifications-panel">
                        <h2>🔔 Application updates</h2>

                        {notifications.map((notification) => (
                            <div
                                className="notification-card"
                                key={notification.id}
                            >
                                <p style={{ whiteSpace: "pre-line" }}>
                                    {notification.message}
                                </p>

                                <span>
                                    {new Date(
                                        notification.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </section>
                )}

                {loading && <p>Loading applications...</p>}

                {!loading && applications.length === 0 && (
                    <div className="empty-applications">
                        <h2>No applications yet</h2>

                        <p>
                            You haven’t applied to any opportunities yet.
                        </p>
                    </div>
                )}

                <div className="applications-grid">
                    {applications.map((application) => (
                        <div
                            className="application-card"
                            key={application.id}
                        >
                            <div className="application-top">
                                <h2>{application.jobPosition.title}</h2>

                                <span
                                    className={`status-badge ${application.status.toLowerCase()}`}
                                >
                                    {application.status}
                                </span>
                            </div>

                            <p className="application-location">
                                {application.jobPosition.location}
                            </p>

                            <div className="application-info">
                                <span>Employment</span>

                                <strong>
                                    {application.jobPosition.employmentType}
                                </strong>
                            </div>

                            <div className="application-info">
                                <span>Applied at</span>

                                <strong>
                                    {new Date(
                                        application.appliedAt
                                    ).toLocaleDateString()}
                                </strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MyApplicationsPage;