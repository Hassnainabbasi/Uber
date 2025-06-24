const { validationResult } = require("express-validator");
const mapService = require("../services/MapService");
const { trace } = require("../app");
const captainModel = require("../models/CaptionModal");

module.exports.getCoordinates = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid address", errors: error.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceAndTime = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        message: "Invalid origin or destination",
        errors: error.array(),
      });
    }

    const { origin, destination } = req.query;
    const distanceAndTime = await mapService.getDistanceAndTime(
      origin,
      destination
    );

    res.status(200).json(distanceAndTime);
  } catch (error) {
    console.error("Error fetching distance and time:", error);
  }
};

module.exports.getSuggestions = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: "Invalid origin or destination",
      errors: error.array(),
    });
  }
  const { input } = req.query;
  try {
    const suggestions = await mapService.getSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return res.status(404).json({ message: "Suggestions not found" });
  }
};

