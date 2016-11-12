var express = require('express');
var router = express.Router();
var plans = require('./userPlan.js');
var train = require('./train.js');
var auth = require('./authenticate/auth.js');
var role = require("./authenticate/role");
router.get('/', function(req, res, next) {
    res.render('index');
});




// Role Routes

router.post('/api/v1/role', role.createRole);
router.get('/api/v1/role', role.getRole);

// login 
router.post('/login', auth.doLogin);

router.get('/api/v1/plans', plans.getPlan);
router.get('/api/v1/trains', train.gettrains);


module.exports = router;