var mongoose = require("mongoose")

let taxe = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"taxes", required: true},

    name: {type: String, required: true},
    cost: {type: Number, required: true}
})

exports.TaxeSchema = mongoose.model('Taxe', taxe)