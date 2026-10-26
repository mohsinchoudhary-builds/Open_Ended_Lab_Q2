// INFRASTRUCTURE LAYER: data access using TypeORM.
const AppDataSource = require("../database/data-source");
const UserSchema = require("../database/entities/UserSchema");

class UserRepository {
  get repo() {
    return AppDataSource.getRepository(UserSchema);
  }

  async findByEmail(email) {
    return this.repo.findOne({ where: { email } });
  }

  async save(user) {
    return this.repo.save(this.repo.create(user));
  }

  async findAll() {
    return this.repo.find({ order: { id: "ASC" } });
  }
}

module.exports = UserRepository;