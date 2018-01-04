"use strict";

var mongoose = require("mongoose");

var solution = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: false },
    products: [{ type: mongoose.Schema.ObjectId, ref: "Product", required: false }]
});

exports.SolutionSchema = mongoose.model('Solution', solution);