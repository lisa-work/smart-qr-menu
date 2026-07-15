import { z } from "zod";

export const categoryValidation = z.object({
    name: z.string().trim().min(2, "Category name must be at least 2 characters").max(30, "Category name must be less than 30 characters"),
    description: z.string().trim().max(100, "Description must be less than 100 characters").optional(),
})

export const updateCategoryValidation = categoryValidation.partial()