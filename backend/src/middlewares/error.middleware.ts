import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../errors/AppErrors";

// Error handling middleware for Express
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // If the error is an instance of AppErrors, return the custom error response
    if (err instanceof AppErrors) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    // For other types of errors, return a generic 500 Internal Server Error response
    return res.status(500).json({
        message: "Internal server error"
    })
}