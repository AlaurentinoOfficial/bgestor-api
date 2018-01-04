"use strict";

var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");

var store = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: false },
    products: [{ type: mongoose.Schema.ObjectId, ref: "Product", required: false }],
    solution: { type: mongoose.Schema.ObjectId, ref: "Solution", childPath: "stores", required: true, unique: false }
});

store.plugin(relationship, { relationshipPathName: 'solution' });
exports.StoreSchema = mongoose.model('Store', store);