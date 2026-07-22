import { prisma } from "../config/prisma";

export const getDashboard = async (restaurantId: number) => {
    const [foods, categories, featured, unavailable] = await Promise.all([
        prisma.food.count({
            where: {
                category: {
                    restaurantId: restaurantId,
                }
            }
        }),

        prisma.category.count({
            where: {
                restaurantId: restaurantId,
            }
        }),

        prisma.food.count({
            where: {
                category: {
                    restaurantId: restaurantId,
                },
                featured: true,
            }
        }),

        prisma.food.count({
            where: {
                category: {
                    restaurantId: restaurantId,
                },
                available: false,
            }
        })

    ])

    return {
        cards: {
            foods,
            categories,
            featured,
            unavailable
        }
    }
}
