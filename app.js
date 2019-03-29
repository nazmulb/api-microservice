var express = require('express'),
	bodyParser = require('body-parser'),
	logger = require('morgan');

var app = express(),
	index = require('./routes/index'),
	users = require('./routes/users');

app.use(logger('dev'));
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