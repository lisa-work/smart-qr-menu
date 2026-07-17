import { z } from "zod";

export const foodSchema = z.object({
    name: z.string()
        .trim()
        .min(1, "Food name is required")
        .max(50, "Food name must be less than 50 characters"),

    description: z.string()
        .trim()
        .max(200, "Description must be less than 200 characters")
        .optional(),

    price: z.coerce.number()
        .positive("Price must be a positive number"),

    image: z.string()
        .url("Invalid image URL")
        .optional(),

    available: z.boolean().optional(),

    featured: z.boolean().optional(),

    categoryId: z.number()
        .int()
        .positive("Please select a category"),
});

export const updateFoodSchema = foodSchema.partial();