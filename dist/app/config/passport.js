"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _user = require("../models/user");

var _server = require("../../server");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Authenticate = function (req, res, next) {
    try {
        var token = req.headers["authorization"].replace("CRM ", "");
        var verify = jwt.verify(token, _server.Server.get('crypt_key'));

        _user.UserSchema.findOne({ _id: verify.data }, function (err, u) {
            if (err) res.status(401).send('Unauthorized');

            res.locals.user = u;
            next();
        });
    } catch (e) {
        res.status(401).send('Unauthorized');
        console.log(e);
    }
};