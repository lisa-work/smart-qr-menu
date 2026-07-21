import { prisma } from "../config/prisma";
import { AppErrors } from "../errors/AppErrors";

export const getRestaurantBySlug = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            name: true,
            description: true,
            email: true,
            logo: true,
            address: true,
            phone: true,
            website: true,
            openingHours: true,
        }
    })

    if (!restaurant) {
        throw new AppErrors("Restaurant not found", 404);
    }

    return restaurant;
}