var express = require('express'),
	router = express.Router();

router.get('/', (req, res) => {
	res.json({msg: 'Welcome'});
});

module.exports = router;