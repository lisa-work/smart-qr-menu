import { prisma } from "../config/prisma";
import { AppErrors } from "../errors/AppErrors";

export const getCategoryOrThrow = async (categoryId: number, restaurantId: number) => {
    const category = await prisma.category.findFirst({
        where: {
            id: categoryId,
            restaurantId: restaurantId
        }
    })

    if (!category) {
        throw new AppErrors("Category not found", 404);
    }
    return category;
}