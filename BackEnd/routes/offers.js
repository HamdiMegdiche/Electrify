const express = require('express');
const router = express.Router();
const passport = require('passport');

const { OfferModel } = require('../models');

router.post('/create', passport.authenticate('jwt', {  session: false}), (req, res) => {
  const { from, unitPrice, quantity } = req.body;
  const newOffer = new OfferModel({
    from, unitPrice, quantity
  });

  newOffer.save().then(offer => res.json(offer))
  .catch(err => console.log(err));

});

router.post('/', passport.authenticate('jwt', {  session: false}), (req, res) => {
  const { from } = req.body;
 OfferModel.find({from})
 .then(offers => res.json(offers))
 .catch(err => console.log(err));

});


module.exports = router;