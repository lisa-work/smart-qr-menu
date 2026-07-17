import { z } from "zod";
import { foodSchema, updateFoodSchema } from "@/schema/food";

export type FoodData = z.infer<typeof foodSchema>;
export type UpdateFoodData = z.infer<typeof updateFoodSchema>;

type FoodFields = {
    label: string;
    id: string;
    type: "text" | "textarea" | "number" | "url" | "checkbox" | "file" | "select"| "toggle";
    placeholder?: string;
    required?: boolean;
}

export const FoodFields: FoodFields[] = [
    { label: "Image", id: "image", type: "file" },
    { label: "Name", id: "name", type: "text", placeholder: "Enter food name", required: true },
    { label: "Description", id: "description", type: "textarea", placeholder: "Enter food description", required: true },
    { label: "Price", id: "price", type: "number", placeholder: "Enter food price", required: true },
    { label: "Category", id: "category", type: "select", required: true },
    { label: "Available", id: "available", type: "toggle"},
    { label: "Daily Special", id: "featured", type: "toggle"},

]