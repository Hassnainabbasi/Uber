const BlackListModel = require("../models/BlackListModel");
const userModal = require("../models/UserModel");
const userService = require("../services/UserService");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { fullName, email, password } = req.body;
  console.log(req.body);
  try {
    const isuserAlready = await userModal.findOne({ email });
    if (isuserAlready) {
      return res.status(400).json({ message: "Captain already exist" });
    }
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

module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = await user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Login error:", err);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlackListModel.create({ token });
  res.status(200).json({ message: "Logout User" });
};
