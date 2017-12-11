var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var config = require('dotenv').config();
var MongoDBStore = require('connect-mongodb-session')(session);

var app = express();

// Session Storage for grownups
var store = new MongoDBStore({
  uri: process.env.DB_SESSIONS_CONNECTION_STRING,
  collection: 'sessions'
});

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

app.use(session({
  secret: 'this-is-a-secret-token',
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 365 * 24 *  60 * 60 * 1000,
  },
  proxy: true,
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// ROUTER
var accountsController = require('./routes/api/accounts');
app.use('/api/accounts', accountsController);

// DB Configuration
try {
  var mongoDB = process.env.DB_CONNECTION_STRING;
  mongoose.connect(mongoDB, { useMongoClient: true })
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  var Account = require('./model/Account');
} catch (e) {
  console.log('No db connection. Set DB_CONNECTION_STRING in ENV');
}

// client configuration
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
