'use strict';
var jwt = require('jsonwebtoken');
var auth = require('basic-auth');
var User = require('../models/user');
var Token = require('../models/token');
function errorResponse (res, errors) {
  res.status(500);
  res.json(res.app.get('utils').http.getHttpError(500, errors));
}
function unauthorizedResponse (res) {
  res.status(401);
  res.set('WWW-Authenticate', 'Basic realm="Authentication is required"');
  res.json(res.app.get('utils').http.getHttpError(401, 'Unauthorized'));
}
module.exports = {
  get: (req, res, next) => {
    // Perform the authentication and return the token
    var credentials = auth(req);
    if (!credentials || !credentials.name || !credentials.pass) {
      unauthorizedResponse(res);
    } else {
      // Validate the user
      User.findOne({
        'username': credentials.name
      }, (err, data) => {
        var loggedIn = false;
        var securityUtils = req.app.get('authUtils').security;
        var securityConfig = req.app.get('config').security;
        var tokenDuration = 1000 * 60 * securityConfig.tokenDurationMinutes;
        var tokenData;
        var newToken;
        if (err) {
          console.error(err);
          errorResponse(res, err);
        } else {
          // Check if a user was found
          if (data !== null && data.length !== 0) {
            // Check if the password matches
            if (securityUtils.compareHash(credentials.pass, data.password)) {
              // Create the token and insert
              loggedIn = true;
              tokenData = jwt.sign({
                uid: data._id,
                username: data.username
              }, securityConfig.secret);
              newToken = new Token({
                data: tokenData,
                expirationDate: new Date(Date.now() + tokenDuration)
              });
              newToken.save((err, data) => {
                if (err) {
                  console.error(err);
                  errorResponse(res, err);
                } else {
                  res.json({
                    token: tokenData,
                    expiration: data.expirationDate
                  });
                }
              });
            }
          }
          if (!loggedIn) {
            unauthorizedResponse(res);
          }
        }
      });
    }
  }
};
