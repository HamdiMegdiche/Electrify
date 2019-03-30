const mongoose = require("mongoose");

const HouseHold = new mongoose.Schema({
  zone: {
    type: Number,
    unique: false,
    required: [true, "can't be blank"],
    index: true
  },
  // other attributes

}, {
  timestamps: true
});

module.exports = mongoose.model("HouseHolds", HouseHold);