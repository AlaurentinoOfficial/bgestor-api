'use strict';

var _solution = require('../models/solution');

var _store = require('../models/store');

var _sale = require('../models/sale');

var _product = require('../models/product');

var _Codes = require('../config/Codes');

exports.get = function (req, res) {
    _store.StoreSchema.findOne({ _id: req.params.store }, function (err, store) {
        if (err) return res.json((0, _Codes.GetCode)('INVALID_PARAMS'));

        _sale.SaleSchema.find({ store: store }, function (err, sales) {
            if (err) return res.json([]);

            res.json(sales);
        });
    });
};

exports.post = function (req, res) {
    if (!req.body.client || !req.body.products) return res.json((0, _Codes.GetCode)('INVALID_PARAMS'));

    _store.StoreSchema.findOne({ _id: req.params.store }, function (err, store) {
        if (err || !store) return res.json((0, _Codes.GetCode)('INVALID_PARAMS'));

        req.body.store = store;
        _sale.SaleSchema.new(req.body, function (er, sale) {
            if (er || !sale) return res.json(err);

            res.json({ code: (0, _Codes.GetCode)('SUCCEFULY'), message: 'Accepted transaction' });
        });
    });
};