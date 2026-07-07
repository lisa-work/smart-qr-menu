import { Request, Response } from "express";
import { registerSchema } from "../validators/auth.validation";
import { registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
    const validatedData = registerSchema.safeParse(req.body);

    // const result = await registerUser();

    res.status(200).json({
        message: "Validation passed",
        data: validatedData
    })
}