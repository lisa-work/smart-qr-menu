import { z } from "zod";

// Define the validation schema for restaurant information using zod
export const restaurantSchema = z.object({
    name: z.string().trim().min(1, "Restaurant name is required").max(100, "Restaurant name must be less than 100 characters"),
    email: z.email("Invalid email address").optional(),
    address: z.string().trim().max(255, "Address must be less than 255 characters").optional(),
    openingHours: z.string().trim().optional(),
    logo: z.url().optional(),
    description: z.string().trim().max(500, "Description must be less than 500 characters").optional(),
    phone: z.string().trim().regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format").optional(),
    website: z.url().optional(),
})

// Define the validation schema for updating restaurant information using zod
export const updateRestaurantSchema = restaurantSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
});