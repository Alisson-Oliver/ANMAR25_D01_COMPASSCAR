import { Router } from "express";
import CarController from "../controllers/CarController.js";
import { validateAddCar } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/cars", validateAddCar, CarController.create);
router.get("/cars", CarController.getAll);

export default router;
