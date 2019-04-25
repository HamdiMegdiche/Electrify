const router = require('express').Router();
const userRoutes = require('./users.route'); 
const energyRoutes = require('./energy.route');
const offersRoutes = require('./offers.route');
const iot = require('./iot');

router.get('/', (req, res) => {
  res.send({
    success: true
  });
});

router.use("/user", userRoutes);
router.use("/energy", energyRoutes);
router.use('/offers', offersRoutes);
router.use('/iot', iot);

module.exports = router;
