var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs')

require('./lib/connection');
var employees = require('./routes/employees');
var teams = require('./routes/teams');
var postR = require('./routes/postR');
var deleteR = require('./routes/deleteR');


var app = express();

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// application routes
app.use(employees);
app.use(teams);
app.use(postR);
app.use(deleteR);


/* ==> static server will do
// main page
app.get('/', function (req, res) {
  res.writeHead(200, { 'content-type': 'text/html' });

  fs.createReadStream('./public/html.html').pipe(res);
})
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;