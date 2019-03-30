const router = require('express').Router();
const userRoutes = require('./user.route'); 
const energyRoutes = require('./energy.route');
const offersRoutes = require('./offers');

router.get('/', (req, res) => {
  res.send({
    success: true
  });
});

router.use("/user", userRoutes);
router.use("/energy", energyRoutes);
router.use('/offers', offersRoutes);

module.exports = router;
