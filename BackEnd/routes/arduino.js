const router = require("express").Router();
const socket = require("socket.io");
const {UserModel} = require('../models');


module.exports = function(app,io) {
        router.get('/auth/:id', async function (req, res) {
            console.log("GET OK!" + req.params.id);
           
            const user = await UserModel.findOne({ 'tag': req.params.id }).exec();

        io.sockets.emit('FromAPI',user);
        res.json({result: "update sent over IO"});
        });

        router.get('/temprasp/:temp/:hum/:cons', function (req, res) {
            console.log("GET OK!  " + req.params.temp + "  " + req.params.hum + "%  "+req.params.cons+" watts");
            var weth = { temp: req.params.temp, humi:req.params.hum, cons:req.params.cons};
            try {
              io.sockets.emit('FromAPI', weth);
            } catch (error) {
              console.log("error fel emit socket");
              console.log(error);
            }
            res.json({ result: "update sent over IO" });
          });
    app.use("/arduino", router);
    }

 

  


