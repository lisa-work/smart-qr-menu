import api from "./axios";
import type { RestaurantData } from "../types/restaurant";

const restaurantService = {
    createRestaurant: async (restaurantData: RestaurantData) => {
        const response = await api.post("/restaurant", restaurantData);
        return response.data;
    },

    getRestaurant: async () => {
        const response = await api.get(`/restaurant`);
        return response.data;
    },

    updateRestaurant: async (restaurantData: Partial<RestaurantData>) => {
        const response = await api.put(`/restaurant`, restaurantData);
        return response.data;
    },

    deleteRestaurant: async () => {
        const response = await api.delete(`/restaurant`);
        return response.data;
    }
}

export default restaurantService;