var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var userModel = require('../../models/user.js');
var tokenkey= require('../../configSecret/config');

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
        // Fire a query to your DB and check if the credentials are valid
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
              // If authentication is success, we will generate a token
              // and dispatch it to the client

               var token = genToken(response);
                res.cookie('x-access-token', token.token, { expires: new Date(token.expires) });
                res.cookie('x-key', token.user.username);
                res.json(token);

            //  res.json("Login successfully : "+response.username +":"+ response.roleCode);
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
/**  
 *   JWT-SIMPLE BASED authentication 
 *    private method
 * 
 */

function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires,
    },tokenkey.getkey()); // own implementation 

    return {
        token: token,
        expires: expires,
        user: user.username
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = authentication;
