var express = require('express');
var router = express.Router();
var plans = require('./userPlan.js');
var train = require('./train.js');
var auth = require('./authenticate/auth.js');
router.get('/', function(req, res, next) {
    res.render('index');
});


// login 
router.post('/login', auth.doLogin);

router.get('/api/v1/plans', plans.getPlan);
router.get('/api/v1/trains', train.gettrains);


module.exports = router;