const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var auth = require('./auth');

// import models
const {
    UserModel
} = require("../models");


//just for testing performance
router.post('/test', async (req, res) => {
    for (let i = 101; i <= 201; i++) {
        let user = new UserModel({
            username: `user${i}`,
            email: `user${i}@outlook.fr`,
            password: 'test'
        });
        // console.log('Try to create user'+i);
        await user.save((err) => {
            if (err)
                res.send(err);
        });
        // console.log('created user'+i);
    }
    return res.sendStatus(200);
});

// get all users
router.get('/', (req, res) => {
    UserModel.find((err, users) => {
        if (err)
            console.log(err);

        return res.json(users);
    });
});

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
    var { email, password, username} = req.body;

    UserModel.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
        }
        doc.username = username;
        doc.email = email;
        doc.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
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
    let { email, password, username} = req.body;

    let user = new UserModel({
        username,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    });


    user.save((err, user) => {
        if (err)
            res.send(err);
        else
            res.send(user);
    });
});

//login
router.post('/login', (req, res) => {
    let { email, password } = req.body;
    UserModel.findOne({ email }, function (err, user) {
        if (err)
            res.send(err);
        if (!user)
            res.status(401).json(user);
        else {
            if (bcrypt.compareSync(password, user.password)) {
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