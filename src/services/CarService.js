import CarRepository from "../repositories/CarRepository.js";

class CarService {
  static async createCar(carData) {
    const existingCar = await CarRepository.findByPlate(carData.plate);

    if (existingCar) {
      throw new Error("car already registered");
    }

    return await CarRepository.createCar(carData);
  }

  static async findAll() {
    return await CarRepository.findAll();
  }
}

export default CarService;
