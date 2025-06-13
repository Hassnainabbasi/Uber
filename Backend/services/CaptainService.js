const captainModal = require("../models/CaptionModal");

module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vechileType,
}) => {
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vechileType
  ) {
    console.log("Missing field(s):", {
      firstName,
      email,
      password,
      color,
      plate,
      capacity,
      vechileType,
    });
    throw new Error("All Fields are required");
  }

  const captain = captainModal.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vechile: {
      color,
      plate,
      capacity,
      vechileType,
    },
  });

  return captain;
};
