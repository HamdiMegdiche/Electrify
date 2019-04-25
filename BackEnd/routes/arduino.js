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
    app.use("/arduino", router);
    }

 

  


