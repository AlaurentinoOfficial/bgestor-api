'use strict';

var _solution = require('../models/solution');

var _product = require('../models/product');

var _store = require('../models/store');

var _Codes = require('../config/Codes');

exports.get = function (req, res) {
    if (!req.params.store) return res.json((0, _Codes.GetCode)('INVALID_PARAMS'));

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err || !solution) return res.json([]);

        _store.StoreSchema.findOne({ _id: req.params.store }, function (er, store) {
            if (er || !store) return res.json((0, _Codes.GetCode)('INVALID_PARAMS'));

            _product.ProductSchema.find({ store: store }, function (e, products) {
                if (e || !products) return res.json([]);

                res.json(products);
            });
        });
    });
};

exports.post = function (req, res) {
    _store.StoreSchema.findOne({ _id: req.params.store }, function (er, store) {
        if (er || !store) return res.json((0, _Codes.GetCode)('INVALID_STORE'));

        req.body.store = store;
        _product.ProductSchema.create(req.body, function (err, products) {
            if (err) return res.json({ code: (0, _Codes.GetCode)('INVALID_PARAMS'), message: req.body });

            res.json((0, _Codes.GetCode)('SUCCEFULY'));
        });
    });
};

exports.putById = function (req, res) {
    _product.ProductSchema.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, p) {
        if (err) return res.json((0, _Codes.GetCode)('INVALID_PARAMS'));

        res.json((0, _Codes.GetCode)('SUCCEFULY'));
    });
};

exports.postById = function (req, res) {
    _product.ProductSchema.addStock({ _id: req.params.id }, req.body.stock, function (err, p) {
        if (err) return res.json((0, _Codes.GetCode)('INVALID_PARAMS'));

        res.json((0, _Codes.GetCode)('SUCCEFULY'));
    });
};