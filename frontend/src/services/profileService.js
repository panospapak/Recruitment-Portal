import axios from "axios";

const API_URL = "http://localhost:8080/api/profiles";

export const getMyProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const createMyProfile = async (profile) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/me`,
        profile,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateMyProfile = async (profile) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/me`,
        profile,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteMyProfile = async () => {
    const token = localStorage.getItem("token");

    await axios.delete(
        `${API_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};