'use strict';

var _solution = require('../models/solution');

var _product = require('../models/product');

var _store = require('../models/store');

exports.get = function (req, res) {
    if (!req.params.id) return res.status(400).json({ error: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.id }, function (err, store) {
            if (err) return res.status(500).json({ error: "Invalid arguments" });

            _product.ProductSchema.find({ store: store }, function (err, products) {
                if (err) return res.status(500).json([]);

                res.status(200).json(products);
            });
        });
    });
};

exports.post = function (req, res) {
    if (!req.params.id) return res.status(400).json({ error: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.id }, function (err, store) {
            if (err) return res.status(500).json({ error: "Invalid store" });

            var body = {
                name: req.body.name,
                amount: req.body.amount,
                price: req.body.price,
                description: req.body.description,
                store: store
            };

            _product.ProductSchema.create(body, function (err, products) {
                if (err) return res.status(500).json({ error: "Invalid product" });

                res.json({ message: "Succefuly created product" });
            });
        });
    });
};