import connection from "./src/config/database.config.js";
import app from "./src/config/server.config.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.SV_PORT || 3000;

connection
  .authenticate()
  .then(() => {
    console.log("Database connection successfully");
    app.listen(PORT, () => console.log("Server running"));
  })
  .catch((error) => {
    console.error("Database connection failed: ", error);
  });
