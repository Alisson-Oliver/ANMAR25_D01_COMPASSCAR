import express from "express";
import cors from "cors";
import errorHandler from "../middlewares/error-handler.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(errorHandler);

export default app;
