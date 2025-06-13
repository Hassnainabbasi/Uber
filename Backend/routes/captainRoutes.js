const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const captainControllers = require("../controller/captainController");
const { authCaptain } = require("../middleware/authMiddleWare");


router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long"),
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First Name must be at least 3 characters long"),
  body("vechile.color")
    .isLength({ min: 3 })
    .withMessage("Color Name must be at least 3 characters long"),
  body("vechile.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1 characters long"),
  body("vechile.plate")
    .isLength({ min: 3 })
    .withMessage("Plate Number must be at least 3 characters long"),
],
  captainControllers.registerCaptain
);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

],
  captainControllers.loginCaptain
);

router.post('/profile', authCaptain, captainControllers.getCaptainProfile)

router.post('/logout', authCaptain, captainControllers.logoutCaptain)


module.exports = router;
