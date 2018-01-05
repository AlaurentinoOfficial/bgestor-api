"use strict";

exports.ticket = function (sales) {
    var income = 0;
    var clients = 0;
    sales.forEach(function (i) {
        income += i.price;
        ++clients;
    });

    return income / clients;
};

exports.saleRate = function (sales) {
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