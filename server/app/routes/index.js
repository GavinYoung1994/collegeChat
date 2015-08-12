'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/confirmation', require('./confirmation'));
router.use('/chat', require('./chat'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
