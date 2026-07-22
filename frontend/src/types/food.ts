import { z } from "zod";
import { foodSchema, updateFoodSchema } from "@/schema/food";

export type FoodData = z.infer<typeof foodSchema>;
export type UpdateFoodData = z.infer<typeof updateFoodSchema>;

type FoodFields = {
    label: string;
    id: keyof FoodData;
    type: "text" | "textarea" | "number" | "url" | "checkbox" | "file" | "select"| "toggle";
    placeholder?: string;
    required?: boolean;
}

export const FoodFields: FoodFields[] = [
    { label: "Image", id: "image", type: "file" },
    { label: "Name", id: "name", type: "text", placeholder: "Enter food name", required: true },
    { label: "Description", id: "description", type: "textarea", placeholder: "Enter food description"},
    { label: "Price", id: "price", type: "number", placeholder: "0.00", required: true },
    { label: "Category", id: "categoryId", type: "select", required: true },
    { label: "Available", id: "available", type: "toggle"},
    { label: "Featured Item", id: "featured", type: "toggle"},
]