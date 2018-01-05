"use strict";

var _store = require("./store");

var _sale = require("./sale");

var _product = require("./product");

exports.UpdateTicket = function (sales) {
    _store.StoreSchema.findOne({ _id: sales.store }, function (err, s) {
        var income = 0;
        var clients = 0;
        s.sales.forEach(function (j) {
            _sale.SaleSchema.findOne({ _id: j }, function (err, sale) {
                income += sale.price;
                clients += 1;
            });
        });

        _store.StoreSchema.findOne({ _id: sales.store }, function (err, ss) {
            ss.ticket = income / clients;
            ss.save();
        });
    });
};

exports.UpdateSaleCharge = function (sale) {
    _product.ProductSchema.find({ store: sale.store }, function (err, products) {
        var pr = [];
        var ss = 0;

        products.forEach(function (i) {
            var obj = {};

            obj._id = i._id;
            obj.amount = 0;

            pr.push(obj);
        });

        _sale.SaleSchema.find({ store: sale.store }, function (err, sales) {
            sales.forEach(function (s) {
                s.products.forEach(function (i) {
                    pr.forEach(function (j) {
                        if (i._id == j._id) j.amount += i.amount;
                    });
                });
            });

            pr.forEach(function (i) {
                return ss += i.amount;
            });

            products.forEach(function (i) {
                pr.forEach(function (j) {
                    if (i._id == j._id) {
                        i.sales_charge = j.amount * 100 / ss;
                        i.save();
                    }
                });
            });
        });
    });
};