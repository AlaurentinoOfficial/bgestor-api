'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _solution = require('../models/solution');

var _product = require('../models/product');

var _store = require('../models/store');

exports.get = function (req, res) {
    if (!req.params.store) return res.status(400).json({ error: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.store }, function (err, store) {
            if (err) return res.status(500).json({ code: 500, error: "Invalid arguments" });

            _product.ProductSchema.find({ store: store }, function (err, products) {
                if (err) return res.status(500).json([]);

                res.status(200).json(products);
            });
        });
    });
};

exports.post = function (req, res) {
    if (!req.params.store) return res.status(400).json({ error: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.store }, function (err, store) {
            if (err) return res.status(500).json({ error: "Invalid store" });

            req.body.store = store;

            _product.ProductSchema.create(req.body, function (err, products) {
                if (err) return res.status(500).json({ error: "Invalid product" });

                res.json({ message: "Succefuly created product"
                });
            });
        });
    });
};

exports.putById = function (req, res) {
    if (!req.params.id) return res.status(400).json({ error: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _product.ProductSchema.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, p) {
            if (err) return res.status(500).json({ error: "Invalid product" });

            res.json({ message: "Succefuly updated product" });
        });
    });
};

exports.postById = function (req, res) {
    if (!req.params.id || _typeof(req.body.stock) != _typeof(10)) return res.status(400).json({ error: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _product.ProductSchema.addStock({ _id: req.params.id }, req.body.stock, function (err, p) {
            if (err) return res.status(500).json({ error: "Invalid product" });

            res.json({ message: "Succefuly added in stock" });
        });
    });
};