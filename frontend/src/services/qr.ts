import api from "./axios";

const qrService = {
    getQRCode: async (slug: string) => {
        const response = await api.get(`/restaurant/${slug}/qr`);
        return response.data;
    }
}

export default qrService;