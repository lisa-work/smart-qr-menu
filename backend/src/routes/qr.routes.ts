import { Router } from "express";
import { generateQRCode } from "../controllers/qr.controller";

const router = Router();

router.get("/:slug/qr", generateQRCode);

export default router;