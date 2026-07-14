import { prisma } from "../config/prisma";
import { AppErrors } from "../errors/AppErrors";

// Declare the type for the restaurant creation data
type CreateRestaurantData = {
    name: string;
    address?: string;
    openingHours?: string;
    email?: string;
    logo?: string;
    description?: string;
    phone?: string;
    website?: string;
}

// Service function to create a new restaurant for a specific owner
export const createNewRestaurant = async (ownerId: number, restaurantData: CreateRestaurantData) => {
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

    const newRestaurant = await prisma.restaurant.create({
        data: {
            ...restaurantData,
            ownerId: ownerId
        }
    })

    return newRestaurant;

}

// Service function to get a restaurant by its owner ID
export const getRestaurantByOwnerId = async (ownerId: number) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            ownerId: ownerId
        }
    })

    if (!restaurant) {
        throw new AppErrors("Restaurant not found", 404);
    }

    return restaurant;
}

// Service function to update a restaurant's information for a specific owner
export const updateRestaurant = async (ownerId: number, restaurantData: Partial<CreateRestaurantData>) => {
    const owner = await prisma.user.findUnique({
        where: {
            id: ownerId
        },
        include: {
            restaurant: true
        }
    })

    if (!owner || !owner.restaurant) {
        throw new AppErrors("Restaurant not found", 404);
    }

    const restaurant = await prisma.restaurant.update({
        where: {
            ownerId: ownerId
        },
        data: restaurantData
    })

    return restaurant;
}