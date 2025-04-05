import { Router } from "express";
import { validateItems } from "../middlewares/validation.middleware.js";
import CarItemController from "../controllers/CarItemController.js";

const router = Router();

router.put("/cars/:id/items", validateItems, CarItemController.updateCarItems);

export default router;
