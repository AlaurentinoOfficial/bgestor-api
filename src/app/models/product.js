var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let product = new mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String, required: false},
    store: {type: mongoose.Schema.ObjectId, ref:"Store", childPath:"products", required: true, unique: false}
});

product.plugin(relationship, { relationshipPathName:'store' });
exports.ProductSchema = mongoose.model('Product', product);