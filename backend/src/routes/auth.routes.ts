import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";
import { getCurrentUser, logoutUser } from "../controllers/auth.controller";

const router = Router();

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);
router.post("/logout", logoutUser)

export default router;