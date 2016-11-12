var mongoose = require('mongoose');
var roleModel = require('../../models/role.js');
var q = require('q');
require('mongoose-query-paginate');

var roles = {
    createRole: function (req, res) {
        roleModel.create({ roleCode: req.body.roleCode }, function (err, result) {
            if (err) return err;
            else {
                res.json(result);
             
            }
        });
    },

    getRole: function (req, res) {
        var options = {
               perPage: parseInt(req.query.perPage)||10,
                page:   parseInt(req.query.page)||1,
                sortBy: req.query.sortBy || 'roleCode'
        }

         var query;
        query = roleModel.find({});
        query.paginate(options, function (err, result) {
            res.json(result);
            console.log("" + result);
        });
       
    }

};



module.exports = roles;