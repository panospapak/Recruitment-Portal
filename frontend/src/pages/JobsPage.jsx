import { useEffect, useState } from "react";
import { getJobs, applyToJob } from "../services/jobService";
import HiTechNavbar from "../components/HiTechNavbar";

function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applyingJobId, setApplyingJobId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (error) {
            setMessage("Failed to load jobs.");
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Please login first.");
            return;
        }

        try {
            setApplyingJobId(jobId);
            await applyToJob(jobId);
            setMessage("Application submitted successfully!");
        } catch (error) {
            setMessage(error.response?.data?.message || "Application failed.");
        } finally {
            setApplyingJobId(null);
        }
    };

    return (
        <>
            <HiTechNavbar />

            <div className="page">
                <h1>Open Opportunities</h1>

                {loading && <p>Loading jobs...</p>}
                {message && <p>{message}</p>}
                {!loading && jobs.length === 0 && <p>No jobs available.</p>}

                {jobs.map((job) => (
                    <div className="card" key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p>{job.location}</p>
                        <p>{job.employmentType}</p>

                        <button
                            onClick={() => handleApply(job.id)}
                            disabled={applyingJobId === job.id}
                        >
                            {applyingJobId === job.id ? "Applying..." : "Apply"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default JobsPage;