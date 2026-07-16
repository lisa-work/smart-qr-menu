import { z } from "zod";

export const categoryValidation = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters long"),
    description: z.string().optional(),
});

export const updateCategoryValidation = categoryValidation.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
});