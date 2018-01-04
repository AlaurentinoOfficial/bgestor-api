var mongoose = require("mongoose")

let solution = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    user: {type: mongoose.Schema.ObjectId, ref:"User", required: false},
    stores: [{type: mongoose.Schema.ObjectId, ref:"Store", required: false}]
});

exports.SolutionSchema = mongoose.model('Solution', solution);