const mongoose = require("mongoose");


const OutputDetail = new mongoose.Schema({
    smartHubId: {
      type: String
    },
    date: {
      type: Date
    },
    Consumption: {
      type: Number
    },
    applianceName: {
      type: String
    }
    // other attributes
  });
  
module.exports = mongoose.model("outputDetail", OutputDetail);
