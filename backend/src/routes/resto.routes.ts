import { Router } from "express";
import { createRestaurant, getRestaurant, updateRestaurantInfo } from "../controllers/resto.controller";
import { protect } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

const router = Router();

// Resto routes
router.post("/", protect, upload.single("logo"), createRestaurant);
router.get("/", protect, getRestaurant);
router.put("/", protect, upload.single("logo"), updateRestaurantInfo);

export default router;