import { z } from "zod";
import { restaurantSchema } from "@/schema/restaurant";

export type RestaurantData = z.infer<typeof restaurantSchema>;

export type RestaurantSettingsType = {
    label: string;
    id: string;
    type: "text" | "number" | "email" | "boolean" | "select" | "textarea";
    subtitle?: string;
    required?: boolean;
    placeholder?: string;
    default?: string | number | boolean;
}

export const RestaurantSettings: RestaurantSettingsType[] = [
    { label: "Logo", id: "logo", type: "text", subtitle: "Square logo works best" },
    { label: "Restaurant Name", id: "name", type: "text", placeholder: "The Golden Fork", required: true },
    { label: "Description", id: "description", type: "textarea", placeholder: "Fresh, seasonal cuisine crafted with love" },
    { label: "Email", id: "email", type: "email", placeholder: "info@therestaurant.com" },
    { label: "Phone", id: "phone", type: "text", placeholder: "123-456-7890" },
    { label: "Address", id: "address", type: "text", placeholder: "123 Main St, City, Country" },
    { label: "Opening Hours", id: "openingHours", type: "text", placeholder: "10:00 AM - 10:00 PM" },
    { label: "Website", id: "website", type: "text", placeholder: "https://www.therestaurant.com" }
];