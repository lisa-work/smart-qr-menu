import { User } from "@prisma/client";

// Define a type that represents a user object without the password field
type SafeUser = Omit<User, "password">;

// Extend the Express Request interface to include a user property of type User
declare global {
    namespace Express {
        interface Request {
            user?: SafeUser;
        }
    }
}

export {};