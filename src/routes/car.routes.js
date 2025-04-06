import { Router } from "express";
import CarController from "../controllers/CarController.js";
import {
  validateAddCar,
  validateUpdateCar,
} from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/cars", validateAddCar, CarController.create);
router.get("/cars", CarController.getAll);
router.get("/cars/:id", CarController.getById);
router.patch("/cars/:id", validateUpdateCar, CarController.updateCar);
router.delete("/cars/:id", CarController.deleteCar);

export default router;
