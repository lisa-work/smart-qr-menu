import { prisma } from "../config/prisma";
import { AppErrors } from "../errors/AppErrors";
import { ensureSlugAvailable, generateSlug, getRestaurantOrThrow } from "../utils"
import { restaurantValidation, updateRestaurantValidation } from "../validators/resto.validation";
import { z } from "zod";
import StorageService from "./storage.service";

// Declare the type for the restaurant creation data
export type CreateRestaurantData = z.infer<typeof restaurantValidation>;
export type UpdatedRestaurantData = z.infer<typeof updateRestaurantValidation>;

// Service function to create a new restaurant for a specific owner
export const createNewRestaurant = async (ownerId: number, restaurantData: CreateRestaurantData, logo?: Express.Multer.File) => {
    const owner = await prisma.user.findUnique({
        where: {
            id: ownerId
        },
        include: {
            restaurant: true
        }
    })

    if (!owner) {
        throw new AppErrors("Owner not found", 404);
    }

    if (owner?.restaurant)
        throw new AppErrors("You already have a restaurant", 400)

    const slug = generateSlug(restaurantData.name);
    await ensureSlugAvailable(slug);

    const newRestaurant = await prisma.restaurant.create({
        data: {
            ...restaurantData,
            logo: logo ? StorageService.uploadLogo(logo) : restaurantData.logo,
            slug,
            ownerId: ownerId
        }
    })

    return newRestaurant;

}

// Service function to get a restaurant by its owner ID
export const getRestaurantByOwnerId = async (ownerId: number) => {
    
    const restaurant = await getRestaurantOrThrow(ownerId);
    return restaurant;
}

// Service function to update a restaurant's information for a specific owner
export const updateRestaurant = async (ownerId: number, restaurantData: UpdatedRestaurantData, logo?: Express.Multer.File) => {

    const existingRestaurant = await getRestaurantOrThrow(ownerId); // Ensure the restaurant exists before updating

    const logoPath = logo ? await StorageService.replaceLogo(existingRestaurant.logo, logo) : undefined;

    const restaurant = await prisma.restaurant.update({
        where: {
            ownerId: ownerId
        },
        data: {
            ...restaurantData,
            ...(logoPath ? { logo: logoPath } : {}),
        }
    })

    return restaurant;
}