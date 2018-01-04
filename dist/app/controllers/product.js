"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _server = require("../../server");

var _solution = require("../models/solution");

var _product = require("../models/product");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.get = function (req, res) {
    var token = req.headers["authorization"].replace("bearer ", "");
    var payload = jwt.verify(token ? token : "", _server.Server.get('crypt_key'))._doc;

    _solution.SolutionSchema.findOne({ user: payload }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _product.ProductSchema.find({ solution: solution }, function (err, envs) {
            if (err) return res.status(500).json([]);

            res.status(200).json(envs);
        });
    });
};