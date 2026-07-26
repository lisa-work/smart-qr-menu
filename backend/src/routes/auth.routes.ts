import { Router } from "express";
import { register, login, getCurrent, logoutUser } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrent);
router.post("/logout", logoutUser)

export default router;