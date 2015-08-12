'use strict';
var router = require('express').Router();
var Auth = require('../auth.middleware.js');
module.exports = router;

//code authetication
router.use('/', function (req, res, next) {
	Auth.codeMatch(req, res, next);
});

router.put('/', function (req, res, next){
	res.json({match: true});
})