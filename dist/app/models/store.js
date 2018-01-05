"use strict";

var _constants = require("constants");

var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");

var store = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    ticket: { type: Number, required: false },
    products: [{ type: mongoose.Schema.ObjectId, ref: "Product", required: false }],
    sales: [{ type: mongoose.Schema.ObjectId, ref: "Sale", required: false }],
    solution: { type: mongoose.Schema.ObjectId, ref: "Solution", childPath: "stores", required: true, unique: false }
});

store.plugin(relationship, { relationshipPathName: 'solution' });
exports.StoreSchema = mongoose.model('Store', store);