// Declare the type for the user registration data
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Declare the type for the user login data
export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "USER" | "Owner";
    createdAt: Date;
    updatedAt: Date;
}