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