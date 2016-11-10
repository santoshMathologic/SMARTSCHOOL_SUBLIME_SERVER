var express = require('express');
var router = express.Router();
var plans = require('./userPlan.js');
router.get('/', function(req, res, next) {
    res.render('index');
});


router.get('/api/v1/plans', plans.getPlan);


module.exports = router;