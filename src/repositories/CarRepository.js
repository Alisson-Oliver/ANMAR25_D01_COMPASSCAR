import Car from "../models/Car.model.js";
import CarItem from "../models/CarItem.model.js";
import { Op, fn, col, where } from "sequelize";

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

  static async findAll({ year, final_plate, brand, limit, offset }) {
    const conditions = {};

    if (year) {
      conditions.year = { [Op.gte]: year };
    }

    if (brand) {
      conditions.brand = { [Op.like]: `%${brand}%` };
    }

    if (final_plate) {
      conditions[Op.and] = where(
        fn("RIGHT", col("plate"), 1),
        final_plate.toString(),
      );
    }

    const result = await Car.findAndCountAll({
      where: conditions,
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    return result;
  }

  static async updateCar(id, carNewData) {
    return await Car.update(carNewData, { where: { id } });
  }

  static async deleteCar(id) {
    return await Car.destroy({ where: { id } });
  }
}

export default CarRepository;
