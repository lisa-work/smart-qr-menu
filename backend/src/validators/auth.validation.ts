import { z } from "zod";

// Define the validation schema for user registration using zod
export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})