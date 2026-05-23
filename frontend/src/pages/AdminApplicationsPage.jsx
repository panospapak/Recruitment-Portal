import { useState } from "react";
import { getAllApplications, updateApplicationStatus } from "../services/jobService";

function AdminApplicationsPage() {
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
            <h1>Applications</h1>

            <button onClick={fetchApplications}>Load Applications</button>

            {applications.map((application) => (
                <div key={application.id}>
                    <h3>{application.jobPosition.title}</h3>
                    <p>User: {application.user.email}</p>
                    <p>Status: {application.status}</p>

                    <select
                        value={application.status}
                        onChange={(e) => handleStatusChange(application.id, e.target.value)}
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

export default AdminApplicationsPage;