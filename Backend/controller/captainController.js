const { validationResult } = require("express-validator");
const captainModal = require("../models/CaptionModal");
const captainService = require("../services/CaptainService");
const BlackListModel = require("../models/BlackListModel");

module.exports.registerCaptain = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { fullName, email, password, vechile } = req.body;
  const hashPassword = await captainModal.hashPassword(password);

  const isCaptainAlready = await captainModal.findOne({ email });

  if (isCaptainAlready) {
    return res.status(400).json({ message: "Captain already exist" });
  }

  const captain = await captainService.createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashPassword,
    color: vechile.color,
    plate: vechile.plate,
    capacity: vechile.capacity,
    vechileType: vechile.vechileType,
  });   

  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { email, password } = req.body;

  const captain = await captainModal.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = await captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlackListModel.create({ token });
  res.clearCookie('token')
  res.status(200).json({ message: "Logged out successfully" });
};
