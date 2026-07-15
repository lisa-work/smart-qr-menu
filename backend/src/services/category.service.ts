import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { AppErrors } from "../errors/AppErrors";
import {getRestaurantOrThrow, getCategoryOrThrow} from "../utils";
import { categoryValidation, updateCategoryValidation } from "../validators/category.validation";
import { z } from "zod";

type CreateCategoryData = z.infer<typeof categoryValidation>;
type UpdateCategoryData = z.infer<typeof updateCategoryValidation>;

export const createCategory = async (ownerId: number, categoryData: CreateCategoryData) => {
    const restaurant = await getRestaurantOrThrow(ownerId);

    try {
        return await prisma.category.create({
            data: {
                ...categoryData,
                restaurantId: restaurant.id,
            },
        });

    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new AppErrors("Category already exists", 409);
        }

        throw error;
    }
}

export const getCategories = async (ownerId: number) => {
    const restaurant = await getRestaurantOrThrow(ownerId);

    const categories = await prisma.category.findMany({
        where: {
            restaurantId: restaurant.id
        },
        orderBy: {
            name: "asc",
        },
    })

    return categories;
}

export const getCategoryById = async (ownerId: number, categoryId: number) => {
    const restaurant = await getRestaurantOrThrow(ownerId);

    const category = await getCategoryOrThrow(categoryId, restaurant.id);

    return category;
}

export const updateCategory = async (ownerId: number, categoryId: number, updateData: UpdateCategoryData) => {
    const restaurant = await getRestaurantOrThrow(ownerId);

    const category = await getCategoryOrThrow(categoryId, restaurant.id);

    return prisma.category.update({
        where: {
            id: category.id,
        },
        data: updateData,
    });
}

export const deleteCategory = async (ownerId: number, categoryId: number) => {
    const restaurant = await getRestaurantOrThrow(ownerId);

    const category = await getCategoryOrThrow(categoryId, restaurant.id);

    return prisma.category.delete({
        where: {
            id: category.id
        }
    });
}