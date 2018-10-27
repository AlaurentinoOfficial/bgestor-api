var mongoose = require("mongoose")

let warehouse = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"warehouses", required: true},

    name: {type: String, required: true},
    address: {type: String, required: true},
    archived: {type: Boolean, default: false, required: false},

    products: [{type: mongoose.Schema.ObjectId, required: false}],
    employees: [{type: mongoose.Schema.ObjectId, required: false}],
    stores: [{type: mongoose.Schema.ObjectId, required: false}],
    shipments: [{type: mongoose.Schema.Types.Mixed, required: false}]
})

exports.WarehouseSchema = mongoose.model('Warehouse', warehouse)