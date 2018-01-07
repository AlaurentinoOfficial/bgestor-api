'use strict';

var _solution = require('../models/solution');

var _store = require('../models/store');

var _Codes = require('../config/Codes');

exports.get = function (req, res) {
    _store.StoreSchema.find({ solution: res.locals.user.solution }, function (err, stores) {
        if (err || !stores) return res.json([]);

        res.json(stores);
    });
};

exports.post = function (req, res) {
    var body = { name: req.body.name, address: req.body.address, solution: res.locals.user.solution };

    _store.StoreSchema.create(body, function (err, stores) {
        if (err || !stores) return res.json((0, _Codes.GetCode)('INVALID_PARAMS'));

        res.json((0, _Codes.GetCode)('SUCCEFULY'));
    });
};

exports.putById = function (req, res) {
    _store.StoreSchema.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, products) {
        if (err || !products) return res.json((0, _Codes.GetCode)('INVALID_PARAMS'));

        res.json((0, _Codes.GetCode)('SUCCEFULY'));
    });
};