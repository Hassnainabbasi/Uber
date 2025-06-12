const user = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const userModal = require("../models/UserModel");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
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
