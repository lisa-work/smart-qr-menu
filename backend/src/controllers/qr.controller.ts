import { Request, Response } from "express";
import { getQRCode } from "../services/qr.service";
import { asyncHandler } from "../middlewares/asyncHandler";

export const generateQRCode = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const clientUrl = process.env.CLIENT_URL;

    if (!clientUrl) {
        throw new Error("CLIENT_URL is not configured.");
    }

    const url = `${clientUrl}/menu/${slug}`;

    const qr = await getQRCode(url);

    return res.status(200).json({qr});
})