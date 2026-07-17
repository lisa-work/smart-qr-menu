import { prisma } from "../config/prisma";
import { AppErrors } from "../errors/AppErrors";

export const getFoodOrThrow = async (foodId: number, restaurantId: number) => {
    const food = await prisma.food.findFirst({
        where: {
            id: foodId,
            category: {
                restaurantId: restaurantId
            }
        }
    })

    if (!food) {
        throw new AppErrors("Food not found", 404);
    }

    return food;
}   