var mongoose = require('mongoose')

let product = new mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String, required: false}
});
exports.ProductSchema = mongoose.model('Environment', environmentSchema);