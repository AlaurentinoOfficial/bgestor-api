var mongoose = require("mongoose")

let store = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"stores", required: true},

    name: {type: String, required: true},
    address: {type: String, default: "", required: true},
    type: {type: String, enum: ['physical', 'ecommerce', 'other'], require: true},
    ticket: {type: Number, default: 0, required: false},
})

exports.StoreSchema = mongoose.model('Store', store)