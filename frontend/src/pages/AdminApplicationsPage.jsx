import { useEffect, useState } from "react";
import {
    getAllApplications,
    updateApplicationStatus
} from "../services/jobService";
import { getProfileByUserId } from "../services/profileService";
import PageNavbar from "../components/PageNavbar";

function AdminApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [candidateProfiles, setCandidateProfiles] = useState({});
    const [expandedJobId, setExpandedJobId] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await getAllApplications();
            setApplications(data);

            const profilesMap = {};

            for (const application of data) {
                const userId = application.user.id;

                if (!profilesMap[userId]) {
                    try {
                        const profile = await getProfileByUserId(userId);
                        profilesMap[userId] = profile;
                    } catch (error) {
                        profilesMap[userId] = null;
                    }
                }
            }

            setCandidateProfiles(profilesMap);
        } catch (error) {
            setMessage("Failed to load applications.");
        }
    };

    const groupedApplications = applications.reduce((groups, application) => {
        const jobId = application.jobPosition.id;

        if (!groups[jobId]) {
            groups[jobId] = {
                job: application.jobPosition,
                applications: []
            };
        }

        groups[jobId].applications.push(application);

        return groups;
    }, {});

    const handleStatusChange = async (applicationId, status) => {
        try {
            await updateApplicationStatus(applicationId, status);

            setApplications((prevApplications) =>
                prevApplications.map((application) =>
                    application.id === applicationId
                        ? { ...application, status }
                        : application
                )
            );

            setMessage("Application status updated.");
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to update application."
            );
        }
    };

    const handleOpenCandidateProfile = (userId) => {
        const profile = candidateProfiles[userId];

        if (!profile) {
            setMessage("Candidate has not completed a profile yet.");
            return;
        }

        setSelectedProfile(profile);
    };

    const getCandidateName = (application) => {
        const profile = candidateProfiles[application.user.id];

        if (profile?.firstName || profile?.lastName) {
            return `${profile.firstName || ""} ${profile.lastName || ""}`.trim();
        }

        return application.user.email;
    };

    const getFileUrl = (fileUrl) => {
        if (!fileUrl) {
            return "";
        }

        if (fileUrl.startsWith("http")) {
            return fileUrl;
        }

        if (fileUrl.startsWith("/")) {
            return `http://localhost:8080${fileUrl}`;
        }

        return `http://localhost:8080/${fileUrl}`;
    };

    return (
        <>
            <PageNavbar />

            <main className="admin-page">
                <section className="admin-header">
                    <p className="hi-label">Admin area</p>

                    <h1>Applications</h1>

                    <p>
                        Review applications grouped by job, inspect candidate
                        profiles and update recruitment status.
                    </p>
                </section>

                {message && (
                    <p className="admin-message">
                        {message}
                    </p>
                )}

                <section className="applications-admin-list">
                    {Object.values(groupedApplications).map((group) => (
                        <article
                            className="application-job-group"
                            key={group.job.id}
                        >
                            <button
                                className="application-job-header"
                                onClick={() =>
                                    setExpandedJobId(
                                        expandedJobId === group.job.id
                                            ? null
                                            : group.job.id
                                    )
                                }
                            >
                                <div>
                                    <h2>{group.job.title}</h2>

                                    <p>
                                        {group.job.location} ·{" "}
                                        {group.job.employmentType}
                                    </p>
                                </div>

                                <span>
                                    {group.applications.length} application
                                    {group.applications.length !== 1 ? "s" : ""}
                                </span>
                            </button>

                            {expandedJobId === group.job.id && (
                                <div className="candidate-list">
                                    {group.applications.map((application) => (
                                        <div
                                            className="candidate-row"
                                            key={application.id}
                                        >
                                            <div>
                                                <button
                                                    className="candidate-name-button"
                                                    onClick={() =>
                                                        handleOpenCandidateProfile(
                                                            application.user.id
                                                        )
                                                    }
                                                >
                                                    {getCandidateName(application)}
                                                </button>

                                                <p>{application.user.email}</p>
                                            </div>

                                            <select
                                                value={application.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        application.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="SUBMITTED">
                                                    SUBMITTED
                                                </option>
                                                <option value="UNDER_REVIEW">
                                                    UNDER REVIEW
                                                </option>
                                                <option value="INTERVIEW">
                                                    INTERVIEW
                                                </option>
                                                <option value="ACCEPTED">
                                                    ACCEPTED
                                                </option>
                                                <option value="REJECTED">
                                                    REJECTED
                                                </option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </section>
            </main>

            {selectedProfile && (
                <div className="profile-modal-overlay">
                    <div className="candidate-profile-modal">
                        <button
                            className="auth-close"
                            onClick={() => setSelectedProfile(null)}
                        >
                            ×
                        </button>

                        <div className="candidate-modal-header">
                            <div className="profile-avatar">
                                {selectedProfile.profilePhotoUrl ? (
                                    <img
                                        src={getFileUrl(selectedProfile.profilePhotoUrl)}
                                        alt="Candidate"
                                        className="profile-avatar-image"
                                    />
                                ) : (
                                    selectedProfile.firstName
                                        ? selectedProfile.firstName.charAt(0).toUpperCase()
                                        : "C"
                                )}
                            </div> 

                            <div>
                                <h2>
                                    {selectedProfile.firstName || "Candidate"}{" "}
                                    {selectedProfile.lastName || ""}
                                </h2>

                                <p>{selectedProfile.email || "-"}</p>
                            </div>
                        </div>

                        <div className="candidate-modal-grid">
                            <p>
                                <strong>Phone:</strong>{" "}
                                {selectedProfile.phoneNumber || "-"}
                            </p>

                            <p>
                                <strong>Address:</strong>{" "}
                                {selectedProfile.address || "-"}
                            </p>

                            <p>
                                <strong>LinkedIn:</strong>{" "}
                                {selectedProfile.linkedinUrl || "-"}
                            </p>
                        </div>

                        <div className="candidate-modal-section">
                            <h3>Bio</h3>
                            <p>{selectedProfile.bio || "No bio provided."}</p>
                        </div>

                        <div className="candidate-modal-actions">
                            {selectedProfile.cvFileUrl ? (
                                <a
                                    href={getFileUrl(selectedProfile.cvFileUrl)}
                                    download
                                    target="_blank"
                                    rel="noreferrer"
                                    className="download-cv-button"
                                >
                                    Download CV
                                </a>
                            ) : (
                                <p>No CV uploaded.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminApplicationsPage;