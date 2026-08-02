import { Request, Response } from "express"
import { getRestaurantBySlug } from "../services/menu.service";

export const getRestaurant = async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

    const menu = await getRestaurantBySlug(slug)

    res.status(200).json({
        success: true,
        ...menu
    })
}

