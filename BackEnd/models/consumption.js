const mongoose = require('mongoose');


// changed collection name to users
var consumption_rpi = mongoose.Schema(
    {
        consumption:{
            type: String ,   
        }
        
    },
    {
        timestamps: true
      }
);
  module.exports = mongoose.model('consumption', consumption_rpi);
