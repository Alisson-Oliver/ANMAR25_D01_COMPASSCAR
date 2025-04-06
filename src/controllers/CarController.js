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
      const cars = await CarService.findAll(req.query);
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "id is required" });
      }

      const car = await CarService.findCarById(id);
      return res.status(200).json({ car });
    } catch (error) {
      if (error.message === "car not found") {
        return res.status(404).json({ error: [error.message] });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateCar(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "id is required" });
      }

      await CarService.updateCar(id, req.body);
      return res.status(204).send();
    } catch (error) {
      if (error.message === "car not found") {
        return res.status(404).json({ error: [error.message] });
      } else if (error.message === "car already registered") {
        return res.status(409).json({ error: [error.message] });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}

export default CarController;
