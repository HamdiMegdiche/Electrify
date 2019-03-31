const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const keys = require('../config/keys');
const passport = require('passport');
// import models
const {UserModel} = require('../models');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

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
  const { username, password, email,walletAddress } = req.body;

  UserModel.findOne({ username }).then(user => {
    if (user) {
      errors.username = 'username exists';
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);

    const newUser = new UserModel({
      username,
      email,
      avatar,
      password,
      walletAddress,
      smartHubId: "123456789"
    });

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

  // Find user by username
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

        const {id, username , email, avatar, createdAt , smartHubId, walletAddress} = user;
        // Sign Token
        jwt.sign(payload, keys.TOKEN_KEY, { expiresIn: "2 days" }, (err, token) => {
         return res.json({
            success: true,
            token,
            user: {
              id, username , email, avatar, createdAt , smartHubId,walletAddress
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
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err) console.log(err);

    return res.json(user);
  });
});

// get user by id
router.get('/wallet/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findOne({walletAddress: req.params.id}, (err, user) => {
    if (err) console.log(err);

    return res.json(user);
  });
});

router.post('/update/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  var { email, password } = req.body;

  UserModel.findById(req.params.id, function(err, doc) {
    if (err) 
      console.log(err);
    
    doc.email = email;
    doc.avatar = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);

    doc.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    doc.save((err, doc) => {
      if (err) res.send(err);
      else {
        const {id, username , email, avatar, createdAt, walletAddress} = doc;

        res.send({id, username , email, avatar, createdAt, walletAddress});}
    });
  });
});

module.exports = router;
