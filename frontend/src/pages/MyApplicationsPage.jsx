import { useEffect, useState } from "react";
import { getMyApplications } from "../services/jobService";

function MyApplicationsPage() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await getMyApplications();
            setApplications(data);
        } catch (error) {
            alert("Failed to load applications");
        }
    };

    return (
        <div>
            <h1>My Applications</h1>

            {applications.map((application) => (
                <div key={application.id}>
                    <h2>{application.jobPosition.title}</h2>
                    <p>Status: {application.status}</p>
                    <p>Applied at: {application.appliedAt}</p>
                </div>
            ))}
        </div>
    );
}

export default MyApplicationsPage;