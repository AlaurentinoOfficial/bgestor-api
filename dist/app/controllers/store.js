'use strict';

var _solution = require('../models/solution');

var _store = require('../models/store');

exports.get = function (req, res) {
    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.find({ solution: solution }, function (err, stores) {
            if (err) return res.status(500).json([]);

            res.status(200).json(stores);
        });
    });
};

exports.post = function (req, res) {
    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        var body = { name: req.body.name, address: req.body.address, solution: solution };

        _store.StoreSchema.create(body, function (err, stores) {
            if (err) return res.status(500).json({ code: 500, error: 'Invalid arguments' });

            res.json({ code: 200, message: "Succefuly created store" });
        });
    });
};

exports.putById = function (req, res) {
    if (!req.params.id) return res.status(400).json({ error: "Missing arguments" });

    _solution.SolutionSchema.findOne({ user: res.locals.user }, function (err, solution) {
        if (err) return res.status(500).json([]);

        _store.StoreSchema.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, products) {
            if (err) return res.status(500).json({ error: "Invalid store" });

            res.json({ message: "Succefuly updated store"
            });
        });
    });
};