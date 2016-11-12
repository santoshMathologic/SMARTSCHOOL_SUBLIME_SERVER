var express = require('express');
var router = express.Router();
var userModel = require('../../models/user.js');
require('mongoose-query-paginate');
var q = require('q');


  var reg ={
  	 


 registerUser: function(req, res) {

        userModel.find({ userName: req.body.userName }, function(error, result) {
            if (error) {
                res.json(error);
            }
            else if(result.length === 0) {
                
        userModel.create({userName:req.body.userName,firstName:req.body.firstName,lastName:req.body.lastName,password:req.body.password,email:req.body.email}, function(error, result) {
                    if (error) return error;
                    res.status(201);
                    res.json({
                        "result":true,
                        "status":"CREATED",
                        "message":"User created successfully"
                    });
                });
               
            }
            else{
                res.status(200);
                 res.json({
                     "result":false,
                     "status":"EXISTS",
                     "message":"Username already exists. Please try a different username"    
                });
            }
        });


    },



  };

  module.exports = reg;
