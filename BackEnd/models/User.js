const mongoose = require('mongoose');
//Changed File name to User.js
const UserSchema = new mongoose.Schema(
  {
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
      required: [true, "can't be blank"]
    },
    //set the avatar from avatar server || set default avatar
    avatar: {
      type: String
    },
    //set the date
    registredAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// changed collection name to users
module.exports = mongoose.model('users', UserSchema);
