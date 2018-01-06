'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _solution = require('../models/solution');

var _product = require('../models/product');

var _store = require('../models/store');

var _Codes = require('../config/Codes');

exports.get = function (req, res) {
    if (!req.params.store) return res.status(400).json({ code: (0, _Codes.GetCode)('MISSING_ARGUMENTS'), message: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.store }, function (err, store) {
            if (err) return res.status(500).json({ code: (0, _Codes.GetCode)('MISSING_ARGUMENTS'), message: "Invalid arguments" });

            _product.ProductSchema.find({ store: store }, function (err, products) {
                if (err) return res.status(500).json([]);

                res.status(200).json(products);
            });
        });
    });
};

exports.post = function (req, res) {
    if (!req.params.store) return res.status(400).json({ code: (0, _Codes.GetCode)('MISSING_ARGUMENTS'), message: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (e, solution) {
        if (e) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.store }, function (er, store) {
            if (er) return res.status(500).json({ code: (0, _Codes.GetCode)('INVALID_STORE'), message: "Invalid store" });

            req.body.store = store;

            _product.ProductSchema.create(req.body, function (err, products) {
                if (err) return res.status(500).json({ code: (0, _Codes.GetCode)('MISSING_ARGUMENTS'), message: "Invalid arguments" });

                res.json({ code: (0, _Codes.GetCode)('SUCCEFULY'), message: "Succefuly created product" });
            });
        });
    });
};

exports.putById = function (req, res) {
    if (!req.params.id) return res.status(400).json({ code: (0, _Codes.GetCode)('MISSING_ARGUMENTS'), message: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _product.ProductSchema.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, p) {
            if (err) return res.status(500).json({ code: (0, _Codes.GetCode)('MISSING_ARGUMENTS'), message: "Invalid arguments" });

            res.json({ code: (0, _Codes.GetCode)('SUCCEFULY'), message: "Succefuly updated product" });
        });
    });
};

exports.postById = function (req, res) {
    if (!req.params.id || _typeof(req.body.stock) != _typeof(10)) return res.status(400).json({ code: (0, _Codes.GetCode)('MISSING_ARGUMENTS'), message: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        console.log(_product.ProductSchema.aa);

        _product.ProductSchema.addStock({ _id: req.params.id }, req.body.stock, function (err, p) {
            if (err) return res.status(500).json({ code: (0, _Codes.GetCode)('MISSING_ARGUMENTS'), message: "Invalid arguments" });

            res.json({ code: (0, _Codes.GetCode)('SUCCEFULY'), message: "Succefuly added in stock" });
        });
    });
};