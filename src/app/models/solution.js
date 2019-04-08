var mongoose = require("mongoose")

let solution = new mongoose.Schema({
    name: {type: String, required: true, unique: false},
    cnpj: {type: String, required: true, unique: true},
    stores_limit: {type: Number, required: true},
    products_limit: {type: Number, required: true},
    monthly_price: {type: Number, required: true},
    certificate: {type: String, required: true, unique: true}
})

exports.SolutionSchema = mongoose.model('Solution', solution)