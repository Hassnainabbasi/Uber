const { getRounds } = require("bcrypt");
const mapService = require("../services/MapService");
const RideModal = require("../models/RideModal");
const crypto = require("crypto");
const { sendMessageToSocket } = require("../socket");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required to calculate fare.");
  }
  const distanceTime = await mapService.getDistanceAndTime(pickup, destination);
  // console.log("Distance and time:", distanceTime);

  function parseDistance(distanceStr) {
    return parseFloat(distanceStr.replace(/,/g, "").replace(/[^\d.]/g, ""));
  }

  function parseDuration(durationStr) {
    const hoursMatch = durationStr.match(/(\d+)\s*hour/);
    const minsMatch = durationStr.match(/(\d+)\s*min/);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minsMatch ? parseInt(minsMatch[1]) : 0;
    return hours * 60 + minutes;
  }

  const distance = parseDistance(distanceTime.distance);
  const duration = parseDuration(distanceTime.duration);

  const baseFares = {
    auto: 30,
    car: 50,
    moto: 20,
  };
  const perKmRates = {
    auto: 10,
    car: 15,
    moto: 8,
  };
  const perMinuteRates = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };
  const fare = {
    auto:
      baseFares.auto +
      perKmRates.auto * distance +
      perMinuteRates.auto * duration,
    car:
      baseFares.car + perKmRates.car * distance + perMinuteRates.car * duration,
    moto:
      baseFares.moto +
      perKmRates.moto * distance +
      perMinuteRates.moto * duration,
  };

  return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
  if (!Number.isInteger(num) || num < 1) {
    throw new Error("num must be a positive integer");
  }
  const digits = "0123456789";
  let otp = "";
  const bytes = crypto.randomBytes(num);
  for (let i = 0; i < num; i++) {
    otp += digits[bytes[i] % 10];
  }
  return otp;
}

module.exports.createRides = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error(
      "User, pickup, destination, and vehicle type are required."
    );
  }

  const fare = await getFare(pickup, destination);
  // console.log("Fare calculated:", fare);

  const ride = await RideModal.create({
    otp: getOtp(6),
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
  });
  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  // console.log( rideId, captain, "this data id" );

  await RideModal.updateOne(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain,
    }
  );

  const ride = await RideModal.findOne({
    _id: rideId,
  })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  const ride = await RideModal.findOne({
    _id: rideId,
  })
    .populate("user")
    .populate("captain");

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid");
  }

  await RideModal.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  sendMessageToSocket(ride.user.socketId, {
    event: "ride-start",
    data: ride,
  });

  console.log(ride, "this ride full of data");

  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }
  const ride = await RideModal.findOne({
    _id: rideId,
    captain: captain._id,
  })
    .populate("user")
    .populate("captain");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (!ride.status === "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await RideModal.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );
  return ride;
};
