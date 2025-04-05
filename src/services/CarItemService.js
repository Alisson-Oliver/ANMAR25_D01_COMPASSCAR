import CarItemRepository from "../repositories/CarItemRepository.js";
import CarRepository from "../repositories/CarRepository.js";

class CarItemService {
  static async updateCarItems(carId, items) {
    const car = await CarRepository.findById(carId);
    if (!car) {
      throw new Error("car not found");
    }
    await CarItemRepository.deleteByCarId(carId);

    const newItems = items.map((itemName) => ({
      car_id: carId,
      name: itemName,
    }));

    await CarItemRepository.bulkInsertItems(newItems);
  }
}

export default CarItemService;
