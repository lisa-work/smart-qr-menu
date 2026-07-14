import { Router } from "express";
import { createRestaurant, getRestaurant, updateRestaurantInfo } from "../controllers/resto.controller";

const route = Router();

// Resto routes
route.post("/", createRestaurant);
route.get("/:id", getRestaurant);
route.put("/:id", updateRestaurantInfo);