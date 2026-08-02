import { prisma } from "../config/prisma";
import { AppErrors } from "../errors/AppErrors";

export const getRestaurantBySlug = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            name: true,
            description: true,
            email: true,
            logo: true,
            address: true,
            phone: true,
            website: true,
            openingHours: true,
            categories: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    foods: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            image: true,
                            available: true,
                            featured: true,
                            categoryId: true,
                        },
                        orderBy: {
                            name: "asc",
                        },
                    },
                },
                orderBy: {
                    name: "asc",
                },
            },
        }
    })

    if (!restaurant) {
        throw new AppErrors("Restaurant not found", 404);
    }

    const { categories, ...restaurantInfo } = restaurant;

    return {
        restaurant: restaurantInfo,
        categories,
    };
}