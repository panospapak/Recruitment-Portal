import { useEffect, useRef, useState } from "react";
import { getJobs, deleteJob, updateJob } from "../services/jobService";
import PageNavbar from "../components/PageNavbar";

function ManageJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [editingJobId, setEditingJobId] = useState(null);
    const [message, setMessage] = useState("");
    const [jobToDelete, setJobToDelete] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("Hybrid");
    const [responsibilities, setResponsibilities] = useState("");
    const [requirements, setRequirements] = useState("");

    const editSectionRef = useRef(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (error) {
            setMessage("Failed to load jobs.");
        }
    };

    const handleEditJob = (job) => {
        setEditingJobId(job.id);
        setTitle(job.title);
        setDescription(job.description);
        setLocation(job.location);
        setEmploymentType(job.employmentType);
        setResponsibilities(job.responsibilities || "");
        setRequirements(job.requirements || "");
        setMessage("");

        editSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    const handleCancelEdit = () => {
        setEditingJobId(null);
        setTitle("");
        setDescription("");
        setLocation("");
        setEmploymentType("Hybrid");
        setResponsibilities("");
        setRequirements("");
        setMessage("");
    };

    const handleUpdateJob = async () => {
        if (
            !title ||
            !description ||
            !location ||
            !employmentType ||
            !responsibilities ||
            !requirements
        ) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            await updateJob(editingJobId, {
                title,
                description,
                location,
                employmentType,
                responsibilities,
                requirements,
                active: true
            });

            setMessage("Job updated successfully.");
            handleCancelEdit();
            fetchJobs();
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to update job.");
        }
    };

    const handleDeleteJob = async () => {
        if (!jobToDelete) {
            return;
        }

        try {
            await deleteJob(jobToDelete.id);
            setMessage("Job deleted successfully.");
            setJobToDelete(null);
            fetchJobs();
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to delete job.");
        }
    };

    return (
        <>
            <PageNavbar />

            <main className="admin-page">
                <section className="admin-header">
                    <p className="hi-label">Admin area</p>

                    <h1>Manage jobs</h1>

                    <p>
                        Review existing opportunities, update job information
                        and remove positions that are no longer available.
                    </p>
                </section>

                {message && (
                    <p className="admin-message">
                        {message}
                    </p>
                )}

                {editingJobId && (
                    <section
                        ref={editSectionRef}
                        className="admin-form-card manage-edit-card"
                    >
                        <h2>Edit opportunity</h2>

                        <div className="form-grid">
                            <input
                                placeholder="Job title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <input
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />

                            <select
                                value={employmentType}
                                onChange={(e) =>
                                    setEmploymentType(e.target.value)
                                }
                            >
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="On-site">On-site</option>
                            </select>
                        </div>

                        <textarea
                            placeholder="Job description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <textarea
                            placeholder="Responsibilities (one item per line)"
                            value={responsibilities}
                            onChange={(e) =>
                                setResponsibilities(e.target.value)
                            }
                        />

                        <textarea
                            placeholder="Requirements (one item per line)"
                            value={requirements}
                            onChange={(e) =>
                                setRequirements(e.target.value)
                            }
                        />

                        <div className="admin-actions">
                            <button onClick={handleUpdateJob}>
                                Update Job
                            </button>

                            <button
                                className="secondary"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                        </div>
                    </section>
                )}

                <section className="manage-jobs-list">
                    {jobs.map((job) => (
                        <article className="manage-job-card" key={job.id}>
                            <div>
                                <div className="manage-job-top">
                                    <h2>{job.title}</h2>

                                    <span className="status-badge accepted">
                                        {job.active ? "ACTIVE" : "INACTIVE"}
                                    </span>
                                </div>

                                <p>{job.description}</p>

                                <div className="job-meta">
                                    <span>{job.location}</span>
                                    <span>{job.employmentType}</span>
                                </div>
                            </div>

                            <div className="manage-job-actions">
                                <button onClick={() => handleEditJob(job)}>
                                    Edit
                                </button>

                                <button
                                    className="danger"
                                    onClick={() => setJobToDelete(job)}
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </section>

                {jobToDelete && (
                    <div className="delete-modal-overlay">
                        <div className="delete-modal">
                            <h2>Delete opportunity?</h2>

                            <p>
                                Are you sure you want to delete{" "}
                                <strong>{jobToDelete.title}</strong>?
                                This action cannot be undone.
                            </p>

                            <div className="delete-modal-actions">
                                <button
                                    className="secondary"
                                    onClick={() => setJobToDelete(null)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="danger"
                                    onClick={handleDeleteJob}
                                >
                                    Delete Job
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default ManageJobsPage;