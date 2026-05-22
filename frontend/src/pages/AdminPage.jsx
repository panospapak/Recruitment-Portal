import { useState } from "react";
import { createJob, getAllApplications, updateApplicationStatus } from "../services/jobService";

function AdminPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("");

    const handleCreateJob = async () => {
        try {
            await createJob({
                title,
                description,
                location,
                employmentType,
                active: true
            });

            alert("Job created successfully!");

            setTitle("");
            setDescription("");
            setLocation("");
            setEmploymentType("");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create job");
        }
    };

    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
        const data = await getAllApplications();
        setApplications(data);
    };

    const handleStatusChange = async (applicationId, status) => {
        await updateApplicationStatus(applicationId, status);
        fetchApplications();
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <input
                placeholder="Job title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Job description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Employment type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
            />

            <br /><br />

            <button onClick={handleCreateJob}>
                Create Job
            </button>

            <hr />

            <h2>Applications</h2>

            <button onClick={fetchApplications}>
                Load Applications
            </button>

            {applications.map((application) => (
                <div key={application.id}>
                    <h3>{application.jobPosition.title}</h3>
                    <p>User: {application.user.email}</p>
                    <p>Status: {application.status}</p>

                    <select
                        value={application.status}
                        onChange={(e) =>
                            handleStatusChange(application.id, e.target.value)
                        }
                    >
                        <option value="SUBMITTED">SUBMITTED</option>
                        <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                        <option value="INTERVIEW">INTERVIEW</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                </div>
            ))}
        </div>
    );
}

export default AdminPage;