const axios = require("axios");
const captainModel = require("../models/CaptionModal");

module.exports.getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return { ltd: location.lat, lang: location.lng };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      if (element.status === "OK") {
        return {
          distance: element.distance.text,
          duration: element.duration.text,
        };
      } else {
        throw new Error(`Error fetching distance: ${element.status}`);
      }
    } else {
      throw new Error(`Error fetching distance matrix: ${response.data.status}`);
    }

  } catch (error) {
    console.error("Error fetching distance and time:", error);
    throw new Error("Failed to fetch distance and time");
  }
}

module.exports.getSuggestions = async (input) => {
  if (!input || input.length < 1) {
    throw new Error("Input must be at least 3 characters long");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions.map(prediction => ({
        description: prediction.description,
        placeId: prediction.place_id
      }));
    } else {
      throw new Error(`Error fetching suggestions: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw new Error("Failed to fetch suggestions");
  }
}

module.exports.getCaptainInTheRadius = async (ltd, lang, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lang], radius / 3963.2],
      },
    },
  });
  // console.log(captains, ltd, lang, radius);

  const captain = await captainModel.find()

  // console.log(captain);


  return captains

};
