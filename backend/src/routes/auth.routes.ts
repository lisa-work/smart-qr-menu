import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";
import { getCurrentUser } from "../services/auth.service";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);

export default router;