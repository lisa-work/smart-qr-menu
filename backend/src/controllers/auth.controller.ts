import { Request, Response } from "express";
import { registerSchema } from "../validators/auth.validation";
import { registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
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