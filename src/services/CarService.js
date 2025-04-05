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

  static async findCarById(id) {
    const existingCar = await CarRepository.findById(id);

    if (!existingCar) {
      throw new Error("car not found");
    }

    const response = {
      id: existingCar.id,
      brand: existingCar.brand,
      model: existingCar.model,
      year: existingCar.year,
      plate: existingCar.plate,
      created_at: existingCar.created_at,
      items: existingCar.items.map((item) => item.name),
    };
    return response;
  }
}

export default CarService;
