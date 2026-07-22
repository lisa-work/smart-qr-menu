import { prisma } from "../config/prisma";
import { getRestaurantOrThrow, getCategoryOrThrow, getFoodOrThrow } from "../utils";
import { foodValidation, updateFoodValidation } from "../validators/food.validation";
import { z } from "zod";
import StorageService  from "./storage.service";

export type CreateFoodData = z.infer<typeof foodValidation>;
export type UpdateFoodData = z.infer<typeof updateFoodValidation>;



export const createFood = async (ownerId: number, foodData: CreateFoodData, image: Express.Multer.File) => {
    const restaurant = await getRestaurantOrThrow(ownerId);
    const imagePath = StorageService.uploadImage(image)
    await getCategoryOrThrow(foodData.categoryId, restaurant.id);
        const newFood = await prisma.food.create({
            data: {
                ...foodData,
                image: imagePath,
            },
        });
        return newFood;
}

export const getFoods = async (ownerId: number) => {
    const restaurant = await getRestaurantOrThrow(ownerId);
    const food = await prisma.food.findMany({
        where: {
            category: {
                restaurantId: restaurant.id
            }
        },
        include: {
            category: true
        },
        orderBy: {
            name: "asc"
        }
    })
    return food;
}

export const getFoodById =  async (ownerId: number, foodId: number) => {
    const restaurant = await getRestaurantOrThrow(ownerId);
    const food = await getFoodOrThrow(foodId, restaurant.id);
    return food;
}

export const getFoodByCategoryId = async (ownerId: number, categoryId: number) => {
    const restaurant = await getRestaurantOrThrow(ownerId);
    const category = await getCategoryOrThrow(categoryId, restaurant.id);
    const food = prisma.food.findMany({
        where: {
            categoryId: category.id
        },
        orderBy: {
        name: "asc"
        }
    })
    return food;
}

export const updateFoodById = async (ownerId: number, foodId: number, updateData: UpdateFoodData) => {
    const restaurant = await getRestaurantOrThrow(ownerId);
    await getFoodOrThrow(foodId, restaurant.id);
    if (updateData.categoryId) {
        await getCategoryOrThrow(
            updateData.categoryId,
            restaurant.id
        );
    }
    const food = await prisma.food.update({
        where: {
            id: foodId,
        },
        data: {
            ...updateData
        }
    })
    return food;
}

export const deleteFoodById = async (ownerId: number, foodId: number) => {
    const restaurant = await getRestaurantOrThrow(ownerId);
    await getFoodOrThrow(foodId, restaurant.id);
    const food = await prisma.food.delete({
        where: {
            id: foodId,
        }
    })
    return food;
}