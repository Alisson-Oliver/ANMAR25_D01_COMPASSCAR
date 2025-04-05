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

  static async getAll(req, res) {
    try {
      const cars = await CarService.findAll();
      return res.status(200).json({ data: cars });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default CarController;
