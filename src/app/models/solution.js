var mongoose = require("mongoose")

let solution = new mongoose.Schema({
    name: {type: String, required: true, unique: false},
    cnpj: {type: String, required: true, unique: true},
    
    employees: [{type: mongoose.Schema.ObjectId, ref:"User", required: false}],
    stores: [{type: mongoose.Schema.ObjectId, ref:"Store", required: false}],
    warehouses: [{type: mongoose.Schema.ObjectId, ref:"Warehouse", required: false}],
    products: [{type: mongoose.Schema.ObjectId, ref:"Product", required: false}]
})

exports.SolutionSchema = mongoose.model('Solution', solution)