const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), 
    index: { expires: 0 },
  },
});

const BlackListModel = mongoose.model(
  "BlackList    ",
  blacklistedTokenSchema
);

module.exports = BlackListModel;
