"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _server = require("../../server");

var _user = require("../models/user");

var _solution = require("../models/solution");

var _Codes = require("../config/Codes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.login = function (req, res) {
    _user.UserSchema.findOne({ email: req.body.email }, function (err, user) {
        if (err || !user) return res.json((0, _Codes.GetCode)('INVALID_EMAIL'));

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
                var sName = "";
                _solution.SolutionSchema.findOne({ _id: user.solution }, function (err, solution) {
                    if (err || !solution) return;
                    sName = solution.name;
                });

                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 3,
                    data: user._id
                }, _server.Server.get('crypt_key'));

                user.password = null;
                user.token = token;
                res.json(user);
            } else res.json((0, _Codes.GetCode)('INVALID_PASSWORD'));
        });
    });
};

exports.password = function (req, res) {
    var body = { password: req.body.password };

    _user.UserSchema.findOneAndUpdate({ _id: res.locals.user._id }, body, function (err, user) {
        if (err || !user) return res.json((0, _Codes.GetCode)('INVALID_USER'));

        res.json((0, _Codes.GetCode)('SUCCEFULY'));
    });
};