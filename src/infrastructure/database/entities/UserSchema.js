// INFRASTRUCTURE LAYER: TypeORM mapping of the User entity.
const { EntitySchema } = require("typeorm");
const User = require("../../../domain/entities/User");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  target: User,
  columns: {
    id: { type: "int", primary: true, generated: "increment" }, // auto-generated
    name: { type: "varchar", length: 100, nullable: false },
    address: { type: "varchar", length: 255, nullable: false },
    email: { type: "varchar", length: 150, nullable: false, unique: true },
  },
});