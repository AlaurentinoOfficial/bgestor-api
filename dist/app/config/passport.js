"use strict";

var _passportJwt = require("passport-jwt");

var _user = require("../models/user");

var passport = require("passport");


exports.Passport = function (app) {
    var opts = {};
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = app.get('crypt_key');
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
        _user.UserSchema.findOne({ id: jwt_payload.id }, function (err, user) {
            done(null, err ? false : user);
        });
    }));
};