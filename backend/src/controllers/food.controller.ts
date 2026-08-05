import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { getUserId } from "../utils";
import { foodValidation, updateFoodValidation } from "../validators/food.validation";
import { createFood, getFoods, getFoodById, getFoodByCategoryId, updateFoodById, deleteFoodById, patchFoodById } from "../services/food.service";

const toOptionalString = (value: unknown) => {
    if (typeof value !== "string") return value;
    return value.trim() === "" ? undefined : value;
};

const toOptionalNumber = (value: unknown) => {
    if (value === undefined || value === null || value === "") return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
};

const toOptionalBoolean = (value: unknown) => {
    if (value === undefined || value === null || value === "") return undefined;
    if (value === true || value === false) return value;
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
};

const normalizeFoodBody = (body: Request["body"]) => ({
    name: toOptionalString(body.name),
    description: toOptionalString(body.description),
    price: toOptionalNumber(body.price),
    categoryId: toOptionalNumber(body.categoryId),
    available: toOptionalBoolean(body.available),
    featured: toOptionalBoolean(body.featured),
    image: toOptionalString(body.image),
});

export const createNewFood = asyncHandler (async (req: Request, res: Response) => {
    const parsed = foodValidation.safeParse(normalizeFoodBody(req.body));
    if (!parsed.success) {
        return res.status(400).json({errors: parsed.error.issues, message: "Invalid food data"});
    }
    const validatedData = parsed.data;
    const userId = getUserId(req);
    const newFood = await createFood(userId, validatedData, req.file);
    return res.status(201).json({
        message: "Food created successfully",
        food: newFood
    })
});

export const getAllFoods = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const foodList = await getFoods(userId);
    return res.status(200).json({
        message: "Foods retrieved successfully",
        foods: foodList
    });
});

export const getFoodListById = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const foodId = Number(req.params.foodId);
    const food = await getFoodById(userId, foodId);
    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }
    return res.status(200).json({
        message: "Food retrieved successfully",
        food: food
    });
});

export const getFoodListByCategoryId = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const categoryId = Number(req.params.categoryId);
    if (Number.isNaN(categoryId)) {
        return res.status(400).json({message: "Invalid category ID"});
    }

    const foodList = await getFoodByCategoryId(userId, categoryId);

    return res.status(200).json({
        message: "Foods retrieved successfully",
        foods: foodList
    });
});

export const updateFoodListById = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateFoodValidation.safeParse(normalizeFoodBody(req.body));
    if (!parsed.success) {
        return res.status(400).json({errors: parsed.error.issues, message: "Invalid food data"});
    }
    const validatedData = parsed.data;
    const userId = getUserId(req);
    const foodId = Number(req.params.foodId);
    const updatedFood = await updateFoodById(userId, foodId, validatedData, req.file);
    if (!updatedFood) {
        return res.status(404).json({ message: "Food not found" });
    }
    return res.status(200).json({
        message: "Food updated successfully",
        food: updatedFood
    });
});

export const patchFoodListById = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateFoodValidation.safeParse(normalizeFoodBody(req.body));
    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.issues, message: "Invalid data" });
    }

    const validatedData = parsed.data;
    const userId = getUserId(req);
    const foodId = Number(req.params.foodId);
    const patchFood = await patchFoodById(userId, foodId, validatedData);
    if (!patchFood) {
        return res.status(404).json({ message: "Food not found" });
    }
    return res.status(200).json({
        message: "Food updated successfully",
        food: patchFood
    });
});

export const deleteFoodListById = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const foodId = Number(req.params.foodId);
    const deletedFood = await deleteFoodById(userId, foodId);
    if (!deletedFood) {
        return res.status(404).json({ message: "Food not found" });
    }
    return res.status(200).json({
        message: "Food deleted successfully",
        food: deletedFood
    });
});
