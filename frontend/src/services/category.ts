import type { CategoryData } from "@/types/category";
import api from "./axios";

const categoryService = {
    createCategory: async (categoryData: CategoryData) => {
        const response = await api.post("/categories", categoryData);
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get("/categories");
        return response.data;
    },

    getCategoryById: async (categoryId: number) => {
        const response = await api.get(`/categories/${categoryId}`);
        return response.data;
    },

    updateCategory: async (categoryId: number, categoryData: Partial<CategoryData>) => {
        const response = await api.put(`/categories/${categoryId}`, categoryData);
        return response.data;
    },

    deleteCategory: async (categoryId: number) => {
        const response = await api.delete(`/categories/${categoryId}`);
        return response.data;
    },
}

export default categoryService;