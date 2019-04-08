var mongoose = require("mongoose")

let store = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"stores", required: true},

    name: {type: String, required: true},
    type: {type: String, enum: ['physical', 'ecommerce', 'other'], require: true},
    ticket: {type: Number, default: 0, required: false},

    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    neighborhood: {type: String, required: true},
    street: {type: String, required: true},
    number: {type: Number, required: true},
    complement: {type: String, required: true},
})

exports.StoreSchema = mongoose.model('Store', store)