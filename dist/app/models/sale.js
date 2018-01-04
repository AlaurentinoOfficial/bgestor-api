"use strict";

var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");

var sale = new mongoose.Schema({
    products: [{ type: mongoose.Schema.ObjectId, ref: "Product", required: false }],
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    store: { type: mongoose.Schema.ObjectId, ref: "Store", childPath: "sales", required: true, unique: false }
});

sale.plugin(relationship, { relationshipPathName: 'store' });
exports.SaleSchema = mongoose.model('Sale', sale);