const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userControllers = require("../controller/userController");
const { authUser } = require("../middleware/authMiddleWare");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 8 characters long"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First Name must be at least 3 characters long"),
  ],
  userControllers.registerUser
);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

],
  userControllers.loginUser
);

router.post('/profile', authUser,userControllers.getUserProfile)
router.post("/logout", authUser, userControllers.logoutUser);


module.exports = router;
