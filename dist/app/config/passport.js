"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _user = require("../models/user");

var _server = require("../../server");

var _Codes = require("./Codes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Authenticate = function (req, res, next) {
    // Get the token
    var token = req.headers["authorization"].replace("CRM ", "");

    // Verify the token
    jwt.verify(token, _server.Server.get('crypt_key'), function (err, result) {
        // Invalid token
        if (err) return res.json({ code: (0, _Codes.GetCode)('INVALID_TOKEN'), message: "Invalid token" });

        _user.UserSchema.findOne({ _id: result.data }, function (er, u) {
            if (er || !u) return res.json({ code: (0, _Codes.GetCode)('INVALID_USER'), message: 'Invalid user' });

            if (!u.status) return res.json({ code: (0, _Codes.GetCode)('USER_UNCHECKED'), message: 'User blocked' });

            res.locals.user = u;
            next();
        });
    });
};