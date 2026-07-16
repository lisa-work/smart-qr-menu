import { Router } from "express";
import { createRestaurant, getRestaurant, updateRestaurantInfo } from "../controllers/resto.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Resto routes
router.post("/", protect, createRestaurant);
router.get("/", protect, getRestaurant);
router.put("/", protect, updateRestaurantInfo);

export default router;