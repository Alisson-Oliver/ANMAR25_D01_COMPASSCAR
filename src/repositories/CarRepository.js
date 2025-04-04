import Car from "../models/Car.model.js";

class CarRepository {
  static async findByPlate(plate) {
    return await Car.findOne({ where: { plate } });
  }

  static async createCar(carData) {
    return await Car.create(carData);
  }
}

export default CarRepository;
