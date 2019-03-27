require("dotenv").config();

const express = require("express");
const logger = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bp = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

// connect to mongoDB
let mongoUrl = process.env.MONGO_CONNECTION_STRING_REMOTE;
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB at ' + mongoUrl))
  .catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit();
  });

app.set('port', process.env.SERVER_PORT || 4000);
// allow-cors
app.use(cors());

app.use(logger('dev'));
app.use(bp.json());
app.use(bp.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use(cookieParser());

// ******************* routes ***************************
app.use('/api', require("./routes"));

// error handling middleware should be loaded after loading the routes
app.use(errorHandler());


server.listen(app.get('port'),(error) => {
  if (error) {
    console.error(`\n${error}`);
    server.close();
    process.exit(1);
  }
  console.log(`Server Listening at http://localhost:${app.get('port')}/`);
});