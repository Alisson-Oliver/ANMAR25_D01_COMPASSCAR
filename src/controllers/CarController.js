import CarService from "../services/CarService.js";

class CarController {
  static async create(req, res) {
    try {
      const newCar = await CarService.createCar(req.body);
      return res.status(201).json(newCar);
    } catch (error) {
      if (error.message === "car already registered") {
        return res.status(409).json({ error: [error.message] });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}

export default CarController;
