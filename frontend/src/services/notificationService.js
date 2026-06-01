import axios from "axios";

const API_URL = "http://localhost:8080/api/notifications";

const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getMyNotifications = async () => {
    const response = await axios.get(
        `${API_URL}/me`,
        getAuthConfig()
    );

    return response.data;
};

export const hasUnreadNotifications = async () => {
    const response = await axios.get(
        `${API_URL}/me/unread`,
        getAuthConfig()
    );

    return response.data;
};

export const markNotificationsAsRead = async () => {
    await axios.put(
        `${API_URL}/me/read`,
        {},
        getAuthConfig()
    );
};