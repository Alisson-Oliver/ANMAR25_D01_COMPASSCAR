import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const CarItem = sequelize.define(
  "CarItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cars_items",
    timestamps: true,
    updatedAt: false,
    createdAt: "created_at",
  },
);

export default CarItem;
