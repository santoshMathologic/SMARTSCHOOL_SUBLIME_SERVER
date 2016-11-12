var express = require('express');
var router = express.Router();
var userModel = require('../../models/user.js');
require('mongoose-query-paginate');
var q = require('q');


var authentication = {


    doLogin: function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username === '' || password === '') {

            res.status(401);
            res.json({
                "status": 401,
                "message": "Unauthorized User"
            });
            return;

        }

        authentication.validate(username, password).then(function(response) {
           if (response.roleCode === undefined) { // If authentication fails, we send a 401 back
                res.status(403); // Throw generic error Message
                res.json({
                        "result":false,
                        "status":"LOGINFAIL",
                        "message":"Invalid username or password"
                    });
                return;
            }else{
              res.json("Login successfully : "+response.username +":"+ response.roleCode);
            }
        });
    },

    validate: function(username) {
        var deferred = q.defer();

        if (username !== null || username !== "" || username !== undefined) {
            userModel.find({ userName: username }, function(error, userResponse) {
                var userobj = {};

                if (error) { return error; }
                if (userResponse.length > 0) {
                    userobj = {
                        "username": username,
                        "roleCode": userResponse[0]._doc.roleCode
                    };
                    deferred.resolve(userobj);

                } else {
                    userobj = { "roleCode": undefined };
                    deferred.resolve(userResponse);
                }



            });
        }

        return deferred.promise;

    }


};

module.exports = authentication;
