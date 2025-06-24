const express = require("express");
const { authUser } = require("../middleware/authMiddleWare");
const router = express.Router();
const mapController = require("../controller/mapController.js");
const { query } = require("express-validator");
const { getCoordinates } = require("../controller/mapController");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  mapController.getCoordinates
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  mapController.getDistanceAndTime
);

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 1 }),
    authUser,
    mapController.getSuggestions
)

module.exports = router;
