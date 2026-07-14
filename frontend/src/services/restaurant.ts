import api from "./axios";
import type { RestaurantData } from "../types/restaurant";

const restaurantService = {
    createRestaurant: async (restaurantData: RestaurantData) => {
        const response = await api.post("/api/restaurant/create", restaurantData);
        return response.data;
    },

    getRestaurant: async () => {
        const response = await api.get(`/api/restaurant/get`);
        return response.data;
    },

    updateRestaurant: async (restaurantData: Partial<RestaurantData>) => {
        const response = await api.put(`/api/restaurant/update`, restaurantData);
        return response.data;
    }
}

export default restaurantService;