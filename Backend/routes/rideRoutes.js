const express = require("express");
const { body, query } = require("express-validator");
const { authUser, authCaptain } = require("../middleware/authMiddleWare");
const router = express.Router();
const rideController = require("../controller/rideController");

router.post(
  "/create",
  authUser,
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid pickup address"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination address"),
    body("vehicleType")
      .isString()
      .isIn(["auto", "car", "moto"])
      .withMessage("Invalid vehicle type"),
  ],
  rideController.createRides
);

router.get("/get-fare", authUser, [
  query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
  query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),

],
  rideController.getFare
);

router.post('/confirm', authCaptain, [
   body('rideId').isMongoId().withMessage('Invalid Ride Id')
], 
  rideController.confirmRide
 )

router.post('/start-ride', authCaptain,[
  body('rideId').isMongoId().withMessage('Invalid ride Id'),
  body('otp').isString().isLength({ min : 6 , max : 6 }).withMessage('Invalid Otp')
],
  rideController.startRide
)
module.exports = router;

router.post(
  "/end-ride",
  authCaptain,
  [
    body("rideId").isMongoId().withMessage("Invalid ride Id"),
  ],
  rideController.endRide
);
module.exports = router;
