import jwt from "jsonwebtoken";

// Function to generate a JWT token for a given user ID
export const generateToken = (userId: number) => {
    const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

    return jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn,
        }
    );
};