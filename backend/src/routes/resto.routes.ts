import { Router } from "express";
import { createRestaurant, getRestaurant, updateRestaurantInfo } from "../controllers/resto.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Resto routes
router.post("/create", protect, createRestaurant);
router.get("/get", protect, getRestaurant);
router.put("/update", protect,updateRestaurantInfo);

export default router;