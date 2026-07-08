import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import {AppErrors} from "../errors/AppErrors";
import type { Request, Response } from "express";

// Declare the type for the user registration data
type RegisterData = {
    name: string;
    email: string;
    password: string;
}

// Declare the type for the user login data
type LoginData = {
    email: string;
    password: string;
}

// Service function to handle user registration
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
        throw new AppErrors("User already exists", 409);
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

// Service function to handle user login
export const loginUser = async (loginData: LoginData) => {
    // Destructure the login data
    const { email, password } = loginData;

    // Find user by email
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    // User not exist, throw error
    if (!user) {
        throw new AppErrors("Invalid email or password", 404);
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw error
    if (!isPasswordValid) {
        throw new AppErrors("Invalid email or password", 401);
    }

    // Destructure the user object to exclude the password before returning it
    const { password: _, ...safeUser } = user;

    // Return the user data (excluding password) if login is successful
    return safeUser;
}

export const getCurrentUser = (req: Request, res: Response) => {
    return res.json({
        success: true,
        user: req.user,
    });
};