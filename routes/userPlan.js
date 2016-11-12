
var mongoose = require('mongoose');
var userPlanModel = require('../models/userPlan.js');
var q = require('q');
require('mongoose-query-paginate');

var userPlan = {

	 getPlan:function(req,res){

         var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'planName'
        };
        var query;
        query = userPlanModel.find({});
        query.paginate(options, function (err, result) {
            return res.json(result);
            
        });

	 }






};
module.exports = userPlan;