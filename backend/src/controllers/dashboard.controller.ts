import { Request, Response } from "express";
import { getDashboard } from "../services/dashboard.service";
import { getRestaurantOrThrow, getUserId } from "../utils";
import { asyncHandler } from "../middlewares/asyncHandler";

export const getDashboardData = asyncHandler (async ( req: Request, res: Response ) => {
    const userId = getUserId(req)
    const restaurant = await getRestaurantOrThrow(userId);
    const dashboardData = await getDashboard(restaurant.id);

    res.status(200).json(dashboardData);
}) 

