'use strict';

var _solution = require('../models/solution');

var _store = require('../models/store');

var _sale = require('../models/sale');

var _product = require('../models/product');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.get = function (req, res) {
    if (!req.params.store) return res.status(400).json({ code: 400, error: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.store }, function (err, store) {
            if (err) return res.status(500).json({ code: 500, error: "Invalid arguments" });

            _sale.SaleSchema.find({ store: store }, function (err, sales) {
                if (err) return res.status(500).json([]);

                return res.status(200).json(sales);
            });
        });
    });
};

exports.post = function (req, res) {
    if (!req.params.store || !req.body.client || !req.body.products) return res.status(400).json({ code: 400, error: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.store }, function (err, store) {
            if (err) return res.status(500).json({ code: 500, error: "Invalid arguments" });

            var body = {
                client: req.body.client,
                products: req.body.products,
                price: 0,
                date: Date.now(),
                store: store
            };

            var missing = [];
            var saves = [];
            body.products.forEach(function (e) {
                _product.ProductSchema.findOne({ _id: e._id }, function (err, p) {
                    if (err) return console.log('Error');

                    if (p.amount - Math.abs(e.amount) >= 0) {
                        p.amount -= Math.abs(e.amount);
                        saves.push(p);
                    } else missing.push(p);
                });

                body.price += Math.abs(e.amount) * e.price;
            });

            _sale.SaleSchema.create(body, function (err, sale) {
                if (saves.length == body.products.length) saves.forEach(function (e) {
                    return e.save();
                });else return res.status(500).json({ code: 500, error: "Product missing from inventory", products: missing });

                if (err) {
                    console.log(err);
                    return res.status(500).json({ code: 500, error: "Invalid paramters" });
                }

                return res.status(200).json({ code: 200, message: "Successful transaction" });
            });
        });
    });
};

exports.saleRate = function (req, res) {
    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.store }, function (err, store) {
            if (err) return res.status(500).json({ code: 500, error: "Invalid arguments" });

            _sale.SaleSchema.find(_defineProperty({ store: store }, 'store', store), function (err, sales) {
                if (err) return res.status(200).json([]);

                return res.status(200).json(products);
            });
        });
    });
};

exports.ticket = function (req, res) {
    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOne({ _id: req.params.store }, function (err, store) {
            if (err) return res.status(500).json({ code: 500, error: "Invalid arguments" });

            _sale.SaleSchema.find(_defineProperty({ store: store }, 'store', store), function (err, sales) {
                if (err) return res.status(200).json([]);

                var income = 0;
                var clients = 0;
                sales.forEach(function (i) {
                    income += i.price;
                    ++clients;
                });

                return res.status(200).json({ ticket: income / clients });
            });
        });
    });
};