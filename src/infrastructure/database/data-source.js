require("reflect-metadata");
require("dotenv").config();
const path = require("path");
const { DataSource } = require("typeorm");
const UserSchema = require("./entities/UserSchema");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "university_db",
  entities: [UserSchema],
  migrations: [path.join(__dirname, "migrations", "*.js")],
  synchronize: false, // tables are created ONLY through migrations
  logging: ["error", "migration"],
});

module.exports = AppDataSource;