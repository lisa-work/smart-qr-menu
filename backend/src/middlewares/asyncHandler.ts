import { Request, Response, NextFunction } from 'express';

// Middleware to handle asynchronous route handlers and catch errors

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => 
{
    Promise.resolve(fn(req, res, next)).catch(next);
}