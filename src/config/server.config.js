import express from "express";
import cors from "cors";
import carRoutes from "../routes/car.routes.js";
import carItemRoutes from "../routes/car-item.routes.js";
import errorHandler from "../middlewares/error-handler.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", carRoutes, carItemRoutes);

app.use(errorHandler);

export default app;
