const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    index: true
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
  },
  // other attributes

}, {
  timestamps: true
});

module.exports = mongoose.model("user", UserSchema);