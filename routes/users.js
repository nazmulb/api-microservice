var express = require('express'),
	router = express.Router(),
	Users = require('../models/users');

router.get('/', (req, res, next) => {
	Users.getAllUsers().then( (users) => {
		res.json(users);
	}, (e) => {
		next(e);
	});	
});

router.get('/view/:id', (req, res, next) => {
	let id = parseInt(req.params.id);
	Users.getUserById(id).then( (user) => {
		res.json(user);
	}, (e) => {
		next(e);
	});	
});

router.post('/process_login', (req, res, next) => {
	let username = req.body.username,
		password = req.body.password;

	Users.getUserByUsernameAndPassword(username, password).then( (user) => {
		if (Object.keys(user).length > 0) {
			res.json(user);
		}
		
		return res.json({msg: 'Incorrect username or password.'});
	}, (e) => {
		next(e);
	});	
});

router.post('/add_update_user', (req, res, next) => {
	let opt = "insert",
		msg = "Successfully added";
	
	if(req.body._id){ //update
		opt = "update";
		msg = "Successfully updated";
	}else{ //insert
		// Get a timestamp in seconds
		req.body._id = Math.floor(new Date().getTime()/1000);
	}
	
	if(opt == "insert"){
		Users.getUserByUserName(req.body.username).then( (user) => {
			if (Object.keys(user).length > 0) {
				res.json({msg: 'Username already exists. Try another one.'});
			}else{
				Users.insert(req.body).then( (results) => {
					res.json({msg: msg});
				}, (e) => {
					next(e);
				});
			}
		}, (e) => {
			next(e);
		});
	}else{
		delete req.body.username;
		Users.update(req.body).then( (results) => {
			res.json({msg: msg});
		}, (e) => {
			next(e);
		});
	}
});

router.delete('/:id', (req, res, next) => {
	let id = parseInt(req.params.id);
	Users.remove(id).then( (results) => {
		res.json({msg: 'Successfully removed user id: ' +id});
	}, (e) => {
		next(e);
	});	
});

module.exports = router;