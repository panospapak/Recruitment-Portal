import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../services/jobService";
import HiTechNavbar from "../components/HiTechNavbar";

function HomePage() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data.slice(0, 4));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="home-page">
            <section className="hi-hero">
                <HiTechNavbar />

                <div className="hi-hero-content">
                    <div className="hi-hero-text">
                        <h1>
                            Technology
                            <br />
                            that shapes
                            <br />
                            <span>what’s next.</span>
                        </h1>

                        <p>
                            At Hi-Tech, we build innovative solutions that power
                            businesses and improve lives. Join a team of builders,
                            thinkers and doers.
                        </p>

                        <Link to="/jobs">
                            <button className="hi-primary-button">
                                View open roles →
                            </button>
                        </Link>

                        <div className="hi-offices">
                            <p>Our offices</p>
                            <span>Athens</span>
                            <span>•</span>
                            <span>Thessaloniki</span>
                            <span>•</span>
                            <span>Remote</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="hi-openings">
                <div className="hi-section-header">
                    <div>
                        <p className="hi-label">Open opportunities</p>
                        <h2>Find your next opportunity</h2>
                    </div>

                    <Link to="/jobs">View all opportunities →</Link>
                </div>

                <div className="hi-job-list">
                    {jobs.length === 0 && (
                        <div className="hi-job-row">
                            <strong>No open opportunities yet.</strong>
                        </div>
                    )}

                    {jobs.map((job) => (
                        <div className="hi-job-row" key={job.id}>
                            <span className="hi-job-icon purple">{"</>"}</span>
                            <strong>{job.title}</strong>
                            <span>{job.employmentType}</span>
                            <span>{job.location}</span>
                            <span className="hi-tag">
                                {job.active ? "Open" : "Closed"}
                            </span>
                            <Link to="/jobs">→</Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="hi-cv-box">
                <div>
                    <h2>Don’t see the right opportunity?</h2>
                    <p>
                        We’re always looking for talented people. Send us your CV
                        and let’s keep in touch.
                    </p>
                </div>

                <Link to={localStorage.getItem("token") ? "/profile" : "/register"}>
                    <button className="hi-primary-button">
                        Send us your CV →
                    </button>
                </Link>
            </section>
        </div>
    );
}

export default HomePage;