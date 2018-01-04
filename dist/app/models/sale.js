"use strict";

var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");

var sale = new mongoose.Schema({
    client: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    date: { type: Date, default: Date.now(), required: true },
    price: { type: Number, required: true },
    store: { type: mongoose.Schema.ObjectId, ref: "Store", childPath: "sales", required: true, unique: false }
});

sale.plugin(relationship, { relationshipPathName: 'store' });
exports.SaleSchema = mongoose.model('Sale', sale);