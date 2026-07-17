import { z } from "zod";
import { categoryValidation, updateCategoryValidation } from "@/schema/category";

export type CategoryData = z.infer<typeof categoryValidation>;
export type UpdateCategoryData = z.infer<typeof updateCategoryValidation>;

type CategoryFields = {
    label: string;
    id: string;
    type: "text" | "textarea";
    placeholder: string;
    required?: boolean;
}

export const CategoryFields: CategoryFields[] = [
    { label: "Category Name", id: "name", type: "text", placeholder: "Enter category name" },
    { label: "Description", id: "description", type: "textarea", placeholder: "Enter category description" },
];