import { z } from "zod";

// Define the validation schema for user registration using zod
export const registerSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().trim().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().trim().min(8, "Confirm Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

// Define the validation schema for user login using zod
export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().trim().min(8, "Password must be at least 8 characters long"),
})