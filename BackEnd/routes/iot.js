const express = require('express');
const router = express.Router();
var Consumption_rpi = require('../models/consumption');

router.get('/', (req, res) => {
  UserModel.find((err, users) => {
    if (err) console.log(err);

    return res.json(users);
  });
});
//http://localhost:4000/api/iot/Consumption-rpi/55555
router.post('/Consumption-rpi/:consumption', function (req, res, next) {
  var Consumptionrpi_val = req.params.consumption;
  // var  consum= Consumption_rpi
  console.log(Consumptionrpi_val);
  var con = { consumption: Consumptionrpi_val };
  Consumption_rpi.insertMany({ consumption: Consumptionrpi_val }, function (err, ress) {
    if (err) throw err;
    console.log("data inserted");
    res.send("inserted");
  });
});

// http://localhost:4000/api/iot/Consumption
router.get('/Consumption', function (req, res, next) {
  Consumption_rpi.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log('errorsss');
    });
});

module.exports = router;
