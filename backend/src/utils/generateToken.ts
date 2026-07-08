import jwt from "jsonwebtoken";

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