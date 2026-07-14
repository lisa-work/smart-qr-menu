import { prisma } from "../config/prisma";
import { AppErrors } from "../errors/AppErrors";

export const getRestaurantOrThrow = async (ownerId: number) => {
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