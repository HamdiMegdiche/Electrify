const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var auth = require('./auth');

// import models
const {
    UserModel
} = require("../models");

// get user by id
router.get('/:id', auth, (req, res) => {
    UserModel.findById(req.params.id, (err, user) => {
        if (err)
            console.log(err);

        return res.json(user);
    });
});

// update user
router.post('/update/:id', auth, function (req, res) {
    UserModel.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
        }
        doc.username = req.body.username;
        doc.email = req.body.email;
        doc.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        doc.save((err, doc) => {
            if (err)
                res.send(err);
            else
                res.send(doc);
        });
    });
});

//register user
router.post('/register', (req, res) => {
    let user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    });


    user.save((err, user) => {
        if (err)
            res.send(err);
        else
            res.send(user);
    });
});

//login
router.post('/login', function (req, res) {
    UserModel.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err)
            res.send(err);
        if (!user)
            res.status(401).json(user);
        else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                console.log('user found', user);
                let token = jwt.sign({
                    email: user.email
                }, process.env.TOKEN_KEY, {
                    expiresIn: 360000
                })
                res.status(200).json({
                    succes: true,
                    token
                });
            } else
                res.status(401).json('Unauthorized !');
        }
    });
});


module.exports = router;