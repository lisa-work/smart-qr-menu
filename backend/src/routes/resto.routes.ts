import { Router } from "express";
import { createRestaurant, getRestaurant, updateRestaurantInfo } from "../controllers/resto.controller";

const router = Router();

// Resto routes
router.post("/create", createRestaurant);
router.get("/get/:id", getRestaurant);
router.put("/update/:id", updateRestaurantInfo);

export default router;