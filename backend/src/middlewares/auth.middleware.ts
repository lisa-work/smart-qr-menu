import { AppErrors } from "../errors/AppErrors";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { Request, Response, NextFunction } from "express";

// Middleware to protect routes and ensure the user is authenticated
export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get the token from cookies
    const token = req.cookies?.token;

    // If no token is found, return an unauthorized error
    if (!token) {
        return next(new AppErrors("Unauthorized", 401));
    }

    // Verify the token using the JWT secret
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
    ) as JwtPayload & { id?: number };

    // If the token is invalid or does not contain a user ID, return an unauthorized error
    if (!decoded || !decoded.id) {
        return next(new AppErrors("Unauthorized", 401));
    }

    // Find the user in the database using the decoded user ID
    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        }
    });

    // If the user is not found, return an unauthorized error
    if (!user) {
        return next(new AppErrors("Unauthorized", 401));
    }

    // Attach the user object to the request for use in subsequent middleware or route handlers
    req.user = user;

    // Call the next middleware or route handler
    next();
};

// Middleware to authorize users based on their roles
export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        // If the user is not attached to the request, return an unauthorized error
        if (!req.user) {
            return next(new AppErrors("Unauthorized", 401));
        }

        // If the user's role is not included in the allowed roles, return a forbidden error
        if (!roles.includes(req.user.role)) {
            return next(new AppErrors("Forbidden", 403));
        }

        // If the user is authorized, call the next middleware or route handler
        next();
    }
}