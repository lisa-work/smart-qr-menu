import { Request } from "express";
import { AppErrors } from "../errors/AppErrors";

export const getUserId = (req: Request) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new AppErrors("Unauthorized", 401);
    }
    return userId;
}