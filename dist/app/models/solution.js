"use strict";

var mongoose = require("mongoose");

var solution = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    cnpj: { type: String, required: true, unique: true },
    employees: [{ type: mongoose.Schema.ObjectId, ref: "User", required: false }],
    stores: [{ type: mongoose.Schema.ObjectId, ref: "Store", required: false }]
});

exports.SolutionSchema = mongoose.model('Solution', solution);