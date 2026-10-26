const express = require("express");
const UserRepository = require("../../../infrastructure/repositories/UserRepository");
const { RegisterUser } = require("../../../application/use-cases/RegisterUser");
const UserController = require("../controllers/UserController");

// Wire the layers together.
const userRepository = new UserRepository();
const registerUser = new RegisterUser(userRepository);
const controller = new UserController(registerUser, userRepository);

const router = express.Router();
router.post("/register", controller.register);
router.get("/", controller.list);

module.exports = router;