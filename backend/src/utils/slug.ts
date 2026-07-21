import { prisma } from "../config/prisma";
import { AppErrors } from "../errors/AppErrors";

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const ensureSlugAvailable = async (slug: string) => {
    const existingRestaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
            }
        })
    
    if (existingRestaurant) {
        throw new AppErrors("A restaurant with this name already exists", 409);
    }
}