const userModal = require("../models/UserModel");
const userService = require("../services/UserService");
const { validationResult } = require("express-validator");
module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { fullName, email, password } = req.body;
   console.log(req.body)
  try {
    const hashPassword = await userModal.hashPassword(password);
    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword,
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Error registering user" });
  }
};
