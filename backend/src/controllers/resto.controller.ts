import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { createNewRestaurant, getRestaurantByOwnerId, updateRestaurant } from "../services/resto.service";
import { restaurantValidation, updateRestaurantValidation } from "../validators/resto.validation";
import { getUserId } from "../utils";

// Controller function to create a new restaurant
export const createRestaurant = asyncHandler(async (req: Request, res: Response) => {
    const parsed = restaurantValidation.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.issues, message: "Invalid restaurant data" });
    }

    const validatedData = parsed.data;

    const userId = getUserId(req);

    const newRestaurant = await createNewRestaurant(userId, validatedData);

    return res.status(201).json({
        message: "Restaurant created successfully",
        restaurant: newRestaurant
    })
})

// Controller function to get a restaurant by owner ID
export const getRestaurant = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const restaurant = await getRestaurantByOwnerId(userId);
    return res.status(200).json({
        message: "Restaurant retrieved successfully",
        restaurant: restaurant
    })
})

// Controller function to update a restaurant's information
export const updateRestaurantInfo = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateRestaurantValidation.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ 
            errors: parsed.error.issues, 
            message: "Invalid restaurant data" 
        });
    }

    const userId = getUserId(req);

    const updatedRestaurant = await updateRestaurant(userId, parsed.data);
    return res.status(200).json({
        message: "Restaurant updated successfully",
        restaurant: updatedRestaurant
    })
})