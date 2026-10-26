const { Table } = require("typeorm");

module.exports = class CreateUsersTable1730000000000 {
  name = "CreateUsersTable1730000000000";

  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar", length: "100", isNullable: false },
          { name: "address", type: "varchar", length: "255", isNullable: false },
          { name: "email", type: "varchar", length: "150", isNullable: false, isUnique: true },
        ],
      }),
      true
    );
  }

  async down(queryRunner) {
    await queryRunner.dropTable("users");
  }
};