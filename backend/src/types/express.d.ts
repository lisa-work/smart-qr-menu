import { User } from "@prisma/client";

// Extend the Express Request interface to include a user property of type User
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export {};