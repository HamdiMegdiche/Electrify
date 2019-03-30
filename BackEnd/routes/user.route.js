const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const keys = require('../config/keys');
const passport = require('passport');
// import models
const UserModel = require('../models/User');

// Load Input Validation
const validateRegisterInput = require('./../validation/register');
const validateLoginInput = require('./../validation/login');

//just for testing performance
router.post('/test', async (req, res) => {
  for (let i = 101; i <= 201; i++) {
    let user = new UserModel({
      username: `user${i}`,
      email: `user${i}@outlook.fr`,
      password: 'test'
    });
    // console.log('Try to create user'+i);
    await user.save(err => {
      if (err) res.send(err);
    });
    // console.log('created user'+i);
  }
  return res.sendStatus(200);
});

// get all users
router.get('/', (req, res) => {
  UserModel.find((err, users) => {
    if (err) console.log(err);

    return res.json(users);
  });
});

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { username, password, email } = req.body;

  UserModel.findOne({ username }).then(user => {
    if (user) {
      errors.email = 'username exists';
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    });

    const newUser = new UserModel({
      username,
      email,
      avatar,
      password
    });
    console.log(newUser);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        console.log(newUser);

        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let { username, password } = req.body;

  // Find user by email
  UserModel.findOne({ username }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json('user not found');
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.username, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(payload, keys.TOKEN_KEY, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token,
            user: {
              username: user.username,
              id: user.id,
              avatar: user.avatar
            }
          });
        });
      } else {
        return res.status(400).json('Password incorrect');
      }
    });
  });
});

// get user by id
router.get('/current/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err) console.log(err);

    return res.json(user);
  });
});

// update user dosn't work at this commit
router.post('/update/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  var { email, password, username } = req.body;

  UserModel.findById(req.params.id, function(err, doc) {
    if (err) {
      console.log(err);
    }
    doc.username = username;
    doc.email = email;
    doc.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    doc.save((err, doc) => {
      if (err) res.send(err);
      else res.send(doc);
    });
  });
});

module.exports = router;
