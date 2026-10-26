require("reflect-metadata");
require("dotenv").config();
const express = require("express");
const AppDataSource = require("./infrastructure/database/data-source");
const userRoutes = require("./interfaces/http/routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("PostgreSQL connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });