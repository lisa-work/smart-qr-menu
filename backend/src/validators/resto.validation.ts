import { z } from "zod";

export const restaurantValidation = z.object({
    name: z.string().trim().min(1, "Restaurant name is required").max(100, "Restaurant name must be less than 100 characters"),
    email: z.email("Invalid email address").optional(),
    address: z.string().trim().max(255, "Address must be less than 255 characters").optional(),
    openingHours: z.string().trim().optional(),
    logo: z.url().optional(),
    description: z.string().trim().max(500, "Description must be less than 500 characters").optional(),
    website: z.url().optional(),
})

export const updateRestaurantValidation = restaurantValidation.partial()