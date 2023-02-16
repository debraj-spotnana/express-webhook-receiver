var createError = require('http-errors');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.raw({
  inflate: true,
  type: "*/*",
}));

function printReq(req) {
  console.log("----");
  console.log(req.method + " " + req.url);
  console.log()
  for (const [key, value] of Object.entries(req.headers)) {
    console.log(key + "=" + value)
  }
  console.log(req.method + " " + req.url);
  console.log()
  console.log(req.body.toString());
  console.log("----");
}

app.post('/auth', function(req, res, next) {
  printReq(req);
  res.json({"access_token": "abc", "expires_in": 3600});
});

app.post('/deliver', function(req, res, next) {
  printReq(req);
  res.json({"status":"ok"});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });

  console.log(err);
});

module.exports = app;
