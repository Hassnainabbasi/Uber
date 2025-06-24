const { validationResult } = require("express-validator");
const rideService = require("../services/rideServices");
const MapService = require("../services/MapService");
const { sendMessageToSocket } = require("../socket");
const RideModal = require("../models/RideModal");

module.exports.createRides = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRides({
      user: req.user._id,
      ...req.body,
    });
    res.status(201).json(ride);

    const pickupCoordinates = await MapService.getAddressCoordinates(pickup);

    // console.log(pickupCoordinates, "pickupcordinates");

    const captainRadius = await MapService.getCaptainInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lang,
      50
    );

    // console.log(captainRadius, "captainradius");
    ride.otp = "";

    const rideWithuser = await RideModal.findOne({ _id: ride._id }).populate(
      "user"
    );

    captainRadius.map(async (captain) => {
      // console.log(captain, ride, "rider ka data");
      sendMessageToSocket(captain.socketId, {
        event: "new-ride",
        data: rideWithuser,
      });
    });
  } catch (error) {
    console.error("Error creating ride:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getFare = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    console.error("Error getting fare:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.confirmRide = async (req, res) => {
  // console.log(req.body);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { rideId, captain } = req.body;
  // console.log(rideId, captain, "captainId");

  try {
    const ride = await rideService.confirmRide({ rideId, captain });

    sendMessageToSocket(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    // console.log(ride, "ride confirmed data");
    // console.log(ride.user.socketId, "ride confirmed data");

    return res.status(200).json(ride);
  } catch (e) {
    console.error("Error confirming ride:", e.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.startRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { rideId, otp } = req.body;
  console.log(rideId, otp, "rideId");

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    sendMessageToSocket(ride.user.socketId, {
      event: "ride-start",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (e) {
    console.log("Error starting ride:", e.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.endRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { rideId } = req.body;
  console.log(rideId, "rideId");

  try {
    const ride = await rideService.endRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocket(ride?.user?.socketId, {
      event: "ride-end",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (e) {
    console.log("Error ending ride:", e.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
