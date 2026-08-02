import { z } from "zod";

const optionalText = z.preprocess(
    (value) => {
        if (value === null || value === undefined) return undefined;
        if (typeof value === "string" && value.trim() === "") return undefined;
        return value;
    },
    z.string().trim().optional()
);

const optionalWebsiteUrl = z.preprocess(
    (value) => {
        if (value === null || value === undefined) return undefined;
        if (typeof value === "string" && value.trim() === "") return undefined;
        return value;
    },
    z.url().optional()
);

const optionalLogoPath = z.preprocess(
    (value) => {
        if (value === null || value === undefined) return undefined;
        if (typeof value === "string" && value.trim() === "") return undefined;
        return value;
    },
    z.union([
        z.url(),
        z.string().startsWith("/uploads/")
    ]).optional()
);

export const restaurantValidation = z.object({
    name: z.string().trim().min(1, "Restaurant name is required").max(100, "Restaurant name must be less than 100 characters"),
    email: optionalText.pipe(z.email("Invalid email address").optional()),
    address: optionalText.pipe(z.string().trim().max(255, "Address must be less than 255 characters").optional()),
    openingHours: optionalText,
    logo: optionalLogoPath,
    description: optionalText.pipe(z.string().trim().max(500, "Description must be less than 500 characters").optional()),
    website: optionalWebsiteUrl,
})

export const updateRestaurantValidation = restaurantValidation.partial()