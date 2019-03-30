const mongoose = require("mongoose");

const Output = new mongoose.Schema(
  {
    smartHubId: {
      type: String
    },
    date: {
      type: Date
    },
    totalProduction: {
      type: Number
    },
    totalConsumption: {
      type: Number
    },
    batteryLevel: {
      type: Number
    },
    energyFromGrid: {
      type: Number
    },
    lostEnergy: {
      type: Number
    },
    tempertature: {
      type: Number
    }
    // other attributes
  }
);

module.exports = mongoose.model("output", Output);
