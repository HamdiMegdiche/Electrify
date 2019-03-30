const router = require('express').Router();
const userRoutes = require('./user.route'); 
const energyRoutes = require('./energy.route');

router.get("/", (req, res) => {
  res.send({
    success: true
  });
});

router.use("/user", userRoutes);
router.use("/energy", energyRoutes);

module.exports = router;