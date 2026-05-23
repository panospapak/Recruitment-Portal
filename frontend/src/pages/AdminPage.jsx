import { useState } from "react";
import {
    createJob,
    getJobs,
    getAllApplications,
    updateApplicationStatus,
    deleteJob,
    updateJob
} from "../services/jobService";

function AdminPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("");

    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);

    const [editingJobId, setEditingJobId] = useState(null);

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

            fetchJobs();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create job");
        }
    };

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (error) {
            alert("Failed to load jobs");
        }
    };

    const handleDeleteJob = async (jobId) => {
        try {
            await deleteJob(jobId);
            fetchJobs();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete job");
        }
    };

    const fetchApplications = async () => {
        try {
            const data = await getAllApplications();
            setApplications(data);
        } catch (error) {
            alert("Failed to load applications");
        }
    };

    const handleStatusChange = async (applicationId, status) => {
        try {
            await updateApplicationStatus(applicationId, status);
            fetchApplications();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to update status");
        }
    };

    const handleEditJob = (job) => {
        setEditingJobId(job.id);
        setTitle(job.title);
        setDescription(job.description);
        setLocation(job.location);
        setEmploymentType(job.employmentType);
    };

    const handleUpdateJob = async () => {
        try {
            await updateJob(editingJobId, {
                title,
                description,
                location,
                employmentType,
                active: true
            });

            alert("Job updated successfully!");

            setEditingJobId(null);
            setTitle("");
            setDescription("");
            setLocation("");
            setEmploymentType("");

            fetchJobs();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to update job");
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <h2>Create Job</h2>

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

            {editingJobId ? (
                <button onClick={handleUpdateJob}>
                     Update Job
                </button>
            ) : (
                <button onClick={handleCreateJob}>
                    Create Job
                </button>
            )}

            <hr />

            <h2>Manage Jobs</h2>

            <button onClick={fetchJobs}>
                Load Jobs
            </button>

            {jobs.map((job) => (
                <div key={job.id}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>{job.location}</p>
                    <p>{job.employmentType}</p>

                    <button onClick={() => handleEditJob(job)}>
                        Edit
                    </button>

                    <button onClick={() => handleDeleteJob(job.id)}>
                        Delete
                    </button>
                </div>
            ))}

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