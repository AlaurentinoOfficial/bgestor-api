"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _server = require("../../server");

var _user = require("../models/user");

var _solution = require("../models/solution");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.login = function (req, res) {
    _user.UserSchema.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.json({ success: false, message: 'Invalid email' });

        if (!user) res.json({ success: false, message: 'Invalid email' });else {
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
                    var json = { solution: user.solution, solutionName: user.fullName, email: user.email, token: 'CRM ' + token };

                    res.json(json);
                } else res.json({ success: false, message: 'Invalid password' });
            });
        }
    });
};