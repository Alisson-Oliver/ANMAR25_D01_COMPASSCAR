import Car from "../models/Car.model.js";
import CarItem from "../models/CarItem.model.js";

class CarRepository {
  static async findAll() {
    return await Car.findAll();
  }

  static async findById(id) {
    return await Car.findByPk(id, {
      include: {
        model: CarItem,
        as: "items",
        attributes: ["name"],
      },
    });
  }

  static async create(carData) {
    return await Car.create(carData);
  }

  static async update(id, updateData) {
    return await Car.update(updateData, { where: { id } });
  }

  static async delete(id) {
    return await Car.destroy({ where: { id } });
  }
}

export default CarRepository;
