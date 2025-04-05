import Car from "../models/Car.model.js";
import CarItem from "../models/CarItem.model.js";

class CarRepository {
  static async findByPlate(plate) {
    return await Car.findOne({ where: { plate } });
  }

  static async createCar(carData) {
    return await Car.create(carData);
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

  static async findAll() {
    return await Car.findAll();
  }
}

export default CarRepository;
