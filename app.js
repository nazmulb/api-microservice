var express = require('express'),
	logger = require('morgan');

var app = express(),
	users = require('./routes/users');

app.use(logger('dev'));

app.get('/', function (req, res) {
    res.json({msg: 'Welcome'});
});

app.use('/users', users);

module.exports = app;