import { z } from "zod";

export const categoryValidation = z.object({
    name: z.string().trim().min(1, "Category name is required").max(100, "Category name must be less than 100 characters"),
})

export const updateCategoryValidation = categoryValidation.partial()