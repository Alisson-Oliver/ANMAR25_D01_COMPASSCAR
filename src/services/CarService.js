import CarRepository from "../repositories/CarRepository.js";

class CarService {
  static async createCar(carData) {
    const existingCar = await CarRepository.findByPlate(carData.plate);

    if (existingCar) {
      throw new Error("car already registered");
    }

    return await CarRepository.createCar(carData);
  }

  static async findAll(query) {
    let { year, final_plate, brand, page = 1, limit = 5 } = query;

    page = parseInt(page);
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    limit = parseInt(limit);

    if (isNaN(limit) || limit < 1) {
      limit = 5;
    }
    if (limit > 10) {
      limit = 10;
    }

    const offset = (page - 1) * limit;

    const result = await CarRepository.findAll({
      year,
      final_plate,
      brand,
      limit,
      offset,
    });

    const total = result.count;
    const pages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      count: total,
      pages,
      data: result.rows,
    };
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

  static async updateCar(idCar, carNewData) {
    const existingCar = await CarRepository.findById(idCar);

    if (!existingCar) {
      throw new Error("car not found");
    }

    if (carNewData.plate) {
      const existingPlate = await CarRepository.findByPlate(carNewData.plate);
      if (existingPlate) {
        throw new Error("car already registered");
      }
    }

    await CarRepository.updateCar(idCar, carNewData);
  }
}

export default CarService;
