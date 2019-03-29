var express = require('express'),
	bodyParser = require('body-parser'),
	logger = require('morgan');

var app = express(),
	index = require('./routes/index'),
	users = require('./routes/users');

app.use(logger('dev'));

// Create application/x-www-form-urlencoded parser
// This object will contain key-value pairs, where the value can be a string or array 
// (when extended is false), or any type (when extended is true).
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});
  
// error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({msg: err.message});
});

module.exports = app;