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

// get offers by from id
router.post('/', passport.authenticate('jwt', {  session: false}), (req, res) => {
  const { from } = req.body;
 OfferModel.find({from}).sort('-createdAt')
 .then(offers => res.json(offers))
 .catch(err => console.log(err));

});

// get all offers
router.get('/', passport.authenticate('jwt', {  session: false}), (req, res) => {
  
 OfferModel.find().sort('-createdAt')
 .then(offers => res.json(offers))
 .catch(err => console.log(err));

});

// delete by offer id
router.delete('/:id', passport.authenticate('jwt', {  session: false}), (req, res) => {
  OfferModel.findByIdAndDelete(req.params.id, (err) => {
    if (err)  {
      res.send(err);
      console.log(err);
    }
    else
     return res.sendStatus(200);
  });

});

// delete all offers by id From  (delete with req body dosen't work !!!)
router.post('/delete', passport.authenticate('jwt', {  session: false}), async(req, res) => {
  const { from } = req.body;
  console.log(from);
  OfferModel.find({from}, function(err, docs) {
   docs.forEach(async (doc) =>{
     await doc.remove();
   }
   )
   return res.sendStatus(200);
  });

});


module.exports = router;