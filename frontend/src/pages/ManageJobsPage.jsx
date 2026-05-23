import { useState } from "react";
import { getJobs, deleteJob, updateJob } from "../services/jobService";

function ManageJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [editingJobId, setEditingJobId] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("");

    const fetchJobs = async () => {
        const data = await getJobs();
        setJobs(data);
    };

    const handleEditJob = (job) => {
        setEditingJobId(job.id);
        setTitle(job.title);
        setDescription(job.description);
        setLocation(job.location);
        setEmploymentType(job.employmentType);
    };

    const handleUpdateJob = async () => {
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
    };

    const handleDeleteJob = async (jobId) => {
        await deleteJob(jobId);
        fetchJobs();
    };

    return (
        <div>
            <h1>Manage Jobs</h1>

            <button onClick={fetchJobs}>Load Jobs</button>

            {editingJobId && (
                <div>
                    <h2>Edit Job</h2>

                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <br /><br />

                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    <br /><br />

                    <input value={location} onChange={(e) => setLocation(e.target.value)} />
                    <br /><br />

                    <input value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} />
                    <br /><br />

                    <button onClick={handleUpdateJob}>Update Job</button>
                </div>
            )}

            {jobs.map((job) => (
                <div key={job.id}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>{job.location}</p>
                    <p>{job.employmentType}</p>

                    <button onClick={() => handleEditJob(job)}>Edit</button>
                    {" "}
                    <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ManageJobsPage;