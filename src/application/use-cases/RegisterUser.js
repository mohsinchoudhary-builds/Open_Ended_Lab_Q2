// APPLICATION LAYER: business rules of "register a user".
const User = require("../../domain/entities/User");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, address, email }) {
    name = typeof name === "string" ? name.trim() : "";
    address = typeof address === "string" ? address.trim() : "";
    email = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!name || !address || !email) {
      throw new ValidationError("name, address and email are required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ValidationError("email format is invalid");
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictError("a user with this email is already registered");
    }

    return this.userRepository.save(new User({ name, address, email }));
  }
}

module.exports = { RegisterUser, ValidationError, ConflictError };