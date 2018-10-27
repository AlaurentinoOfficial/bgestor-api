var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let store = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"stores", required: true},

    name: {type: String, required: true},
    address: {type: String, required: true},
    type: {type: String, enum: ['physical', 'ecommerce'], require: true},
    ticket: {type: Number, default: 0, required: false},
    
    products: [{type: mongoose.Schema.ObjectId, required: false}],
    employees: [{type: mongoose.Schema.ObjectId, required: false}],
    sales: [{type: mongoose.Schema.ObjectId, ref:"Sale", required: false}],
})

store.plugin(relationship, { relationshipPathName: 'solution' })
exports.StoreSchema = mongoose.model('Store', store)