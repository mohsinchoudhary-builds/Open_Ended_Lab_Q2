// INTERFACE LAYER: HTTP request/response <-> use case.
class UserController {
  constructor(registerUser, userRepository) {
    this.registerUser = registerUser;
    this.userRepository = userRepository;
    this.register = this.register.bind(this);
    this.list = this.list.bind(this);
  }

  async register(req, res) {
    try {
      const user = await this.registerUser.execute(req.body || {});
      return res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      const status = err.status || 500;
      if (status === 500) console.error(err);
      return res.status(status).json({ error: status === 500 ? "Internal server error" : err.message });
    }
  }

  async list(req, res) {
    try {
      return res.json(await this.userRepository.findAll());
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = UserController;