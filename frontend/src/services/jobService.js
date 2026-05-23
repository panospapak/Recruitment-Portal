import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs";

export const getJobs = async () => {

    const response = await axios.get(API_URL);

    return response.data;
};

export const applyToJob = async (jobPositionId) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/applications/me",
        {
            jobPositionId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getMyApplications = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/applications/me",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const createJob = async (job) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/jobs",
        job,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getAllApplications = async () => {
    const response = await axios.get("http://localhost:8080/api/applications");
    return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/api/applications/${applicationId}/status`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteJob = async (jobId) => {

    const token = localStorage.getItem("token");

    await axios.delete(
        `http://localhost:8080/api/jobs/${jobId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const updateJob = async (jobId, job) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/api/jobs/${jobId}`,
        job,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};