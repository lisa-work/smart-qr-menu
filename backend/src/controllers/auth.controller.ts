import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/auth.validation";
import { registerUser, loginUser } from "../services/auth.service";
import { asyncHandler } from "../middlewares/asyncHandler";
import { generateToken } from "../utils/generateToken";

export const register = asyncHandler(
    async (req: Request, res: Response) => {
    // Validate the request body using the registerSchema (zod)
    const validatedData = registerSchema.safeParse(req.body);

    // If validation fails, return a 400 response with the validation errors
    if (!validatedData.success) {
        return res.status(400).json({
            errors: validatedData.error.issues
        });
    }

    // Call the registerUser service with the validated data
    const user = await registerUser(validatedData.data);

    // Return a 201 response indicating successful registration
    res.status(201).json({
        message: "User registered successfully",
        data: user
    })
}
)

export const login = asyncHandler(
    async (req: Request, res: Response) => {
        // Validate the request body using the loginSchema (zod)
        const validatedLogin = loginSchema.safeParse(req.body);

        // If validation fails, return a 400 response with the validation errors
        if (!validatedLogin.success) {
            return res.status(400).json({
                errors: validatedLogin.error.issues
            })
        }

        // Call the loginUser service with the validated data
        const user = await loginUser(validatedLogin.data);

        // Generate a JWT token for the logged-in user
        const token = generateToken(user.id);

        // Set the token in an HTTP-only cookie for security
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Return a 200 response indicating successful login
        res.status(200).json({
            message: "User logged in successfully",
            success: true,
        })
    }
)