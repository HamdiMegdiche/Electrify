const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  from: {
    type: String,
    required: [true, "can't be blank"],
  },
  walletAddress: {
    type: String,
    required: [true, "can't be blank"],
  },
  quantity: {
    type: Number,
    required: [true, "can't be blank"],
  },
  unitPrice: {
    type: Number,
    required: [true, "can't be blank"],
  },
  status: {
    type: String,
    default: "Pending"
  },
}, {
  timestamps: true
});

// changed collection name to users
module.exports = mongoose.model('offers', OfferSchema);