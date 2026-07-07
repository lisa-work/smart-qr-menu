import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";

// Declare the type for the user registration data
type RegisterData = {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async (userData: RegisterData) => {
    // Destructure the user data
    const { name, email, password } = userData;

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    // If user exists, throw an error
    if (existingUser) {
        throw new Error("User already exists")
    }

    // After validating the user data, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the hashed password
    const user = await prisma.user.create({
        data: {
            name, 
            email,
            password: hashedPassword,
        }
    })

    // Destructure the user object to exclude the password before returning it
    const { password: _, ...safeUser} = user;

    // Return the safe user data
    return safeUser;
}