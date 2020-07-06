var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('main.html', { 
		title: 'title',
		length: 3
	});
});

module.exports = router;
