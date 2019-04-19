const express = require('express');
const router = express.Router();
const passport = require('passport');
const { OfferModel } = require('../models');

// get all offers
router.get('/', passport.authenticate('jwt', {  session: false}), (req, res) => {
 OfferModel.find().sort('-createdAt')
 .then(offers => res.json(offers))
 .catch(err => res.send(err));
});

router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { from, unitPrice, quantity } = req.body;
  const newOffer = new OfferModel({
    from, unitPrice, quantity
  });
  newOffer.save().then(
    offer => res.json(offer)
  )
  .catch( err =>
     res.status(400).json(err)
  )
});

router.post('/confirm/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  OfferModel.findById(req.params.id, (err, doc) => {
      doc.status = "Passed";
      doc.save().then(
        offer => res.json(offer)
      )    
    .catch( err =>
      res.status(400).json(err)
   )

  });
});

// get offers by from wallet address
router.get('/from/:id', passport.authenticate('jwt', {  session: false}), (req, res) => {
  const from  = req.params.id;
 OfferModel.find({from}).sort('-createdAt')
 .then(offers => res.json(offers))
 .catch(err =>  res.send(err));

});



// delete all offers by id From  (delete with req body dosen't work !!!)
router.delete('/delete/:walletAddress', passport.authenticate('jwt', {  session: false }), async(req, res) => {
   const {walletAddress} = req.params;
  OfferModel.find({ from:walletAddress }, function (err, docs) {
    if (err) 
      return res.send(err);
    if (docs.length === 0) {
      return res.sendStatus(404);
    }
   docs.forEach( (doc) =>{
     doc.remove();
   }
   )
   return res.sendStatus(200);
  });

});

// delete by offer id
router.delete('/:id', passport.authenticate('jwt', {  session: false}), (req, res) => {
  OfferModel.findByIdAndDelete(req.params.id, (err) => {
    if (err)  {
      res.send(err);
    }
    else
     return res.sendStatus(200);
  });

});

module.exports = router;