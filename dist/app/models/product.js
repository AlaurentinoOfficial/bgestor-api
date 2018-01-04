"use strict";

var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");

var product = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: false },
    solution: { type: mongoose.Schema.ObjectId, ref: "Solution", childPath: "products", required: true, unique: false }
});

product.plugin(relationship, { relationshipPathName: 'solution' });

exports.ProductSchema = mongoose.model('Product', product);