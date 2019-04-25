require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const passport = require('passport');
// changed var name from "bp" to "bodyParser";
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const socketIo = require("socket.io");

let app = express();
let server = require('http').createServer(app);

// connect to mongoDB Remote
let mongoUrl = process.env.MONGO_CONNECTION_STRING;

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit();
  });

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.set('port', process.env.SERVER_PORT || 4000);
// allow-cors
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride());
app.use(cookieParser());

// ******************* call all routes ***************************
app.use('/api', require('./routes'));

// error handling middleware should be loaded after loading the routes
app.use(errorHandler());

server.listen(app.get('port'), error => {
  if (error) {
    console.error(`\n${error}`);
    server.close();
    process.exit(1);
  }
  console.log(`Server Listening at http://localhost:${app.get('port')}/`);
  console.log(`Get all users at http://localhost:${app.get('port')}/api/user`);
});

const io = socketIo.listen(server);
require("./routes/arduino")(app,io);
