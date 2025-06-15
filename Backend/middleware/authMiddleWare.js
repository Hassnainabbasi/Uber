const user = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const userModal = require("../models/UserModel");
const BlackListModel = require("../models/BlackListModel");
const captainModel = require("../models/CaptionModal");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
 

  const isBlacklisted = await BlackListModel.findOne({token : token})
  if(isBlacklisted){
  return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await userModal.findById(decoded._id)

    req.user = user
    return next()
  } catch (error) {
    console.log(error)
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const alreadyBlacklisted = await BlackListModel.exists({ token });
  if (alreadyBlacklisted) {
    res.clearCookie("token");
    return res.status(200).json({ message: "Already logged out" });
  }

  const isBlacklisted = await BlackListModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;
    return next();
  } catch (error) {
    console.log(error);
  }
};
