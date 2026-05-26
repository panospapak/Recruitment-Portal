import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../services/jobService";
import PageNavbar from "../components/PageNavbar";

function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [selectedType, setSelectedType] = useState("All");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const locations = [
        "All",
        ...new Set(jobs.map((job) => job.location).filter(Boolean))
    ];

    const employmentTypes = [
        "All",
        ...new Set(jobs.map((job) => job.employmentType).filter(Boolean))
    ];

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLocation =
            selectedLocation === "All" ||
            job.location === selectedLocation;

        const matchesType =
            selectedType === "All" ||
            job.employmentType === selectedType;

        return matchesSearch && matchesLocation && matchesType;
    });

    return (
        <>
            <PageNavbar />

            <main className="jobs-page">
                <section className="jobs-hero compact">
                    <p className="hi-label">Careers at Hi-Tech</p>

                    <h1>Open opportunities</h1>
                </section>

                <section className="jobs-search-row improved">
                    <input
                        placeholder="Search opportunities"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        value={selectedLocation}
                        onChange={(e) =>
                            setSelectedLocation(e.target.value)
                        }
                    >
                        {locations.map((location) => (
                            <option
                                key={location}
                                value={location}
                            >
                                {location === "All"
                                    ? "All locations"
                                    : location}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedType}
                        onChange={(e) =>
                            setSelectedType(e.target.value)
                        }
                    >
                        {employmentTypes.map((type) => (
                            <option
                                key={type}
                                value={type}
                            >
                                {type === "All"
                                    ? "All work types"
                                    : type}
                            </option>
                        ))}
                    </select>
                </section>

                <section className="jobs-list-full">
                    <h3>Featured roles</h3>

                    {loading && (
                        <p>Loading opportunities...</p>
                    )}

                    {!loading && filteredJobs.length === 0 && (
                        <div className="jobs-empty">
                            <h2>No roles found</h2>

                            <p>
                                Try another search, location
                                or work type filter.
                            </p>
                        </div>
                    )}

                    <div className="jobs-list">
                        {filteredJobs.map((job) => (
                            <Link
                                key={job.id}
                                to={`/jobs/${job.id}`}
                                className="jobs-list-card"
                            >
                                <div>
                                    <h2>{job.title}</h2>

                                    <p>
                                        {job.location} ·{" "}
                                        {job.employmentType}
                                    </p>
                                </div>

                                <span>→</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default JobsPage;