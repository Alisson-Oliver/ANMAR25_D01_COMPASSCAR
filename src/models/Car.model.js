import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";
import CarItem from "./CarItem.model.js";

const Car = sequelize.define(
  "Car",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plate: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "cars",
    timestamps: false,
  },
);

Car.hasMany(CarItem, { foreignKey: "car_id", as: "items" });
CarItem.belongsTo(Car, { foreignKey: "car_id" });

export default Car;
