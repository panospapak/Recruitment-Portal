import { useState } from "react";
import { createJob } from "../services/jobService";

function CreateJobPage() {
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

    return (
        <div>
            <h1>Create Job</h1>

            <input placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br /><br />

            <textarea placeholder="Job description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <br /><br />

            <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <br /><br />

            <input placeholder="Employment type" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} />
            <br /><br />

            <button onClick={handleCreateJob}>Create Job</button>
        </div>
    );
}

export default CreateJobPage;