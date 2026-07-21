import {Router} from "express";
import { getRestaurant } from "../controllers/menu.controller";

const router = Router();

router.get("/:slug", getRestaurant)

export default router