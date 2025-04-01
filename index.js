import connection from "./src/config/database.config.js";

// Database Connection
connection
  .authenticate()
  .then(() => {
    console.log("Database connection successfully");
  })
  .catch((error) => {
    console.error("Database connection failed: ", error);
  });
