import { ProductSchema } from './product'
import { Strings } from '../config/strings';

var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

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

warehouse.plugin(relationship, { relationshipPathName:'solution' })
exports.WarehouseSchema = mongoose.model('Warehouse', warehouse)