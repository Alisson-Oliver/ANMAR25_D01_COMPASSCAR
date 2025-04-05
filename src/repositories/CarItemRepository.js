import CarItem from "../models/CarItem.model.js";

class CarItemRepository {
  static async deleteByCarId(carId) {
    await CarItem.destroy({ where: { car_id: carId } });
  }

  static async bulkInsertItems(items) {
    await CarItem.bulkCreate(items);
  }
}

export default CarItemRepository;
