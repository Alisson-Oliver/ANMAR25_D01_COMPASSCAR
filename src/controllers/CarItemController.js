import CarItemService from "../services/CarItemService.js";

class CarItemController {
  static async updateCarItems(req, res) {
    try {
      const carId = req.params.id;
      const items = req.body;

      await CarItemService.updateCarItems(carId, items);
      return res.status(204).send();
    } catch (error) {
      if (error.message === "car not found") {
        return res.status(404).json({ errors: [error.message] });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default CarItemController;
