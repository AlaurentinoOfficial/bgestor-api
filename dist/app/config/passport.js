"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _user = require("../models/user");

var _server = require("../../server");

var _Codes = require("./Codes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Authenticate = Authenticate;

function Authenticate(options) {
    return function Authenticate(req, res, next) {
        var token = req.headers["authorization"].replace("CRM ", "");

        jwt.verify(token, _server.Server.get('crypt_key'), function (err, result) {
            if (err || !result) return res.json((0, _Codes.GetCode)('INVALID_TOKEN'));

            _user.UserSchema.findOne({ _id: result.data }, function (er, u) {
                if (er || !u) return res.json((0, _Codes.GetCode)('INVALID_USER'));

                // if(!u.block)
                //     return res.json(GetCode('USER_BLOCK'))

                // if(options.level != undefined)
                //     if(!u.compareLevel(options.level))
                //         return res.json(GetCode('ACCESS_DENIED'))

                res.locals.user = u;
                next();
            });
        });
    };
}