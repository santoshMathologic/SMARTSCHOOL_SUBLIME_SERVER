var express = require('express');
var router = express.Router();
var userModel = require('../../models/user.js');
require('mongoose-query-paginate');
var q = require('q');


  var authentication = {
  	 

  	 doLogin:function(req,res){
  	 	  var username = req.body.username || '';
        var password = req.body.password || '';
         console.log(username);
         console.log(password);

            return res.json({
            	 "username" : username,
            	 "password" : password
            });
  	 }

  };

module.exports = authentication;
