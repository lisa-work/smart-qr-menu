import api from "./axios";

export const getMenu = async (slug: string) => {
    const response = await api.get(`/menu/${slug}`);
    return response.data;
}