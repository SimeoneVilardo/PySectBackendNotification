var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next({ status: 404, message: 'Not Found' })
});

// error handler
app.use(function (err, req, res, next) {
  clean_err = req.app.get('env') === 'development' || err["managed"] === true ? err : {};
  res.status(clean_err.status || 500);
  res.json(clean_err)
});

module.exports = app;
