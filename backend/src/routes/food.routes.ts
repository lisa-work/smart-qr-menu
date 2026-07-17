import {Router} from "express";
import { createNewFood, getAllFoods, getFoodListById, getFoodListByCategoryId, updateFoodListById, deleteFoodListById } from "../controllers/food.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", protect, createNewFood);
router.get("/", protect, getAllFoods);
router.get("/:foodId", protect, getFoodListById);
router.get("/category/:categoryId", protect, getFoodListByCategoryId);
router.put("/:foodId", protect, updateFoodListById);
router.delete("/:foodId", protect, deleteFoodListById);

export default router;