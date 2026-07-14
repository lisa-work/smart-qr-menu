import { Router } from "express";
import { createRestaurant, getRestaurant, updateRestaurantInfo } from "../controllers/resto.controller";

const router = Router();

// Resto routes
router.post("/create", createRestaurant);
router.get("/get", getRestaurant);
router.put("/update", updateRestaurantInfo);

export default router;