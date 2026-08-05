import api from "./axios";

const foodService = {
    createFood: async (foodData: FormData) => {
        const response = await api.post("/foods", foodData);
        return response.data;
    },

    getFoods: async () => {
        const response = await api.get("/foods");
        return response.data;
    },

    getFoodById: async (foodId: number) => {
        const response = await api.get(`/foods/${foodId}`);
        return response.data;
    },

    getFoodByCategoryId: async (categoryId: number) => {
        const response = await api.get(`/foods/category/${categoryId}`);
        return response.data;
    },

    updateFoodById: async (foodId: number, foodData: FormData) => {
        const response = await api.put(`/foods/${foodId}`, foodData);
        return response.data;
    },

    // PATCH function for partial updates (sends JSON)
    patchFoodFeatured: async (foodId: number, featured: boolean) => {
        const response = await api.patch(`/foods/${foodId}`, { featured });
        return response.data;
    },

    patchFoodAvailable: async (foodId: number, available: boolean) => {
        const response = await api.patch(`/foods/${foodId}`, { available });
        return response.data;
    },

    deleteFoodById: async (foodId: number) => {
        const response = await api.delete(`/foods/${foodId}`);
        return response.data;
    }
}

export default foodService;