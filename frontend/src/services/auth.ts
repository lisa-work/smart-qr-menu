import api from "./axios";
import type { RegisterData, LoginData } from "../types/auth";

const authService = {
    // Function to register a new user
    register: async (data: RegisterData) => {
        const response = await api.post("/auth/register", data);
        return response.data;
    },

    // Function to log in an existing user
    login: async (data: LoginData) => {
        const response = await api.post("/auth/login", data);
        return response.data;
    },

    // Function to log out the current user
    logout: async () => {
        const response = await api.post("/auth/logout");
        return response.data;
    },

    // Function to get the current logged-in user's information
    getCurrentUser: async () => {
        const response = await api.get("/auth/me");
        return response.data;
    }
}

export default authService;