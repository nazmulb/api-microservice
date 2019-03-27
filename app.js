var express = require('express'),
	logger = require('morgan');

var users = require('./routes/users'),
	Users = require('./models/users'),
	app = express();

app.use(logger('dev'));

app.use('/users', users);

module.exports = app;