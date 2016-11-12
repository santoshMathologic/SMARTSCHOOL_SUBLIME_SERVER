
var mongoose = require('mongoose');
var trainModel = require('../models/trains.js');
var q = require('q');
require('mongoose-query-paginate');

var train = {

	 gettrains:function(req,res){

         var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            sortBy: req.query.sortBy || 'trainNo'
        };
        var query;
        query = trainModel.find({});
        query.paginate(options, function (err, result) {
            res.json(result);
            console.log("" + result);
        });

	 }






};
module.exports = train;