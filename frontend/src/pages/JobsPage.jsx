import { useEffect, useState } from "react";
import { getJobs, applyToJob } from "../services/jobService";

function JobsPage() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        fetchJobs();

    }, []);

    const fetchJobs = async () => {

        try {

            const data = await getJobs();

            setJobs(data);

        } catch (error) {

            console.error(error);
        }
    };
    const handleApply = async (jobId) => {

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please login first!");

            return;
        }

        try {

           await applyToJob(jobId);
           alert("Application submitted successfully!");
  
        } catch (error) {

            alert(
                error.response?.data?.message
                || "Application failed"
            );
        }
    };

    return (
        <div>

            <h1>Jobs Page</h1>

            {
                jobs.map((job) => (

                    <div
                        key={job.id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >

                        <h2>{job.title}</h2>

                        <p>{job.description}</p>

                        <p>{job.location}</p>

                        <p>{job.employmentType}</p>

                        <button onClick={() => handleApply(job.id)}>
                            Apply
                        </button>

                    </div>
                ))
            }

        </div>
    );
}

export default JobsPage;