require('dotenv').config();
const mongoose = require('mongoose');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');

require('./models/User');
require('./models/LMS');
require('./config/passport');

//var indexRouter = require('./routes/index');
var routesApi = require('./routes/user-api');
var leavesApi = require('./routes/leave-api');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongoUri);
var cors = require('cors');
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


app.use('/api/employees', routesApi);
app.use('/api/leave', leavesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  console.log(req.body);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${process.env.mongoUri}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
  
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
module.exports = app;
