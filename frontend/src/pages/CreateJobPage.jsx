import { useState } from "react";
import { createJob } from "../services/jobService";
import PageNavbar from "../components/PageNavbar";

function CreateJobPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("Hybrid");
    const [responsibilities, setResponsibilities] = useState("");
    const [requirements, setRequirements] = useState("");
    const [message, setMessage] = useState("");

    const handleCreateJob = async () => {
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
            await createJob({
                title,
                description,
                location,
                employmentType,
                responsibilities,
                requirements,
                active: true
            });

            setMessage("Job created successfully!");

            setTitle("");
            setDescription("");
            setLocation("");
            setEmploymentType("Hybrid");
            setResponsibilities("");
            setRequirements("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to create job.");
        }
    };

    return (
        <>
            <PageNavbar />

            <main className="admin-page">
                <section className="admin-header">
                    <p className="hi-label">Admin area</p>
                    <h1>Create new opportunity</h1>
                    <p>
                        Add a new role to the Hi-Tech careers portal. Once created,
                        candidates will be able to view and apply for it.
                    </p>
                </section>

                <section className="admin-form-card">
                    <div className="form-grid">
                        <input
                            placeholder="Job title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Select location</option>
                            <option value="Athens, Greece">Athens, Greece</option>
                            <option value="Thessaloniki, Greece">Thessaloniki, Greece</option>
                            <option value="Patras, Greece">Patras, Greece</option>
                            <option value="Berlin, Germany">Berlin, Germany</option>
                            <option value="Munich, Germany">Munich, Germany</option>
                            <option value="Hamburg, Germany">Hamburg, Germany</option>
                            <option value="Brussels, Belgium">Brussels, Belgium</option>
                            <option value="Antwerp, Belgium">Antwerp, Belgium</option>
                            <option value="Ghent, Belgium">Ghent, Belgium</option>
                        </select>

                        <select
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
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
                        placeholder="Responsibilities - write each point on a new line"
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                    />

                    <textarea
                        placeholder="Requirements - write each point on a new line"
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                    />

                    {message && (
                        <p className="admin-message">
                            {message}
                        </p>
                    )}

                    <button onClick={handleCreateJob}>
                        Create Job
                    </button>
                </section>
            </main>
        </>
    );
}

export default CreateJobPage;