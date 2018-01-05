import { UpdateProfit } from "./analytics";

var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let product = new mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    production_cost: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String, default: "", required: false},
    sales_charge: {type: Number, default: 0, required: false},
    profit: {type: Number, default: 0, required: false},
    store: {type: mongoose.Schema.ObjectId, ref:"Store", childPath:"products", required: true, unique: false}
});

product.post('save', function() {
    var self = this

    UpdateProfit(self)
});

product.plugin(relationship, { relationshipPathName:'store' });
exports.ProductSchema = mongoose.model('Product', product);