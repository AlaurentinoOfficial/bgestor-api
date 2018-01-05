"use strict";

var _store = require("./store");

var _sale = require("./sale");

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

exports.UpdateSaleRate = function (sales) {
    var products = [];
    sales.forEach(function (i) {
        i.products.forEach(function (j) {
            if (products.length > 0) {
                products.forEach(function (k) {
                    if (k._id == j._id) products.push(j);else k.amount += j.amount;
                });
            } else products.push(j);
        });
    });

    var num_sales = 0;
    products.forEach(function (i) {
        return num_sales += i.amount;
    });

    products.forEach(function (i) {
        i.sale_rate = i.amount * 100 / num_sales;
    });

    return products;
};