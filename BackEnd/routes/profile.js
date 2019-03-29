const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) =>
  res.json({
    msg: 'profile works'
  })
);

module.exports = router;
