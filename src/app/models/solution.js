var mongoose = require("mongoose")

let solution = new mongoose.Schema({
    name: {type: String, required: true, unique: false},
    cnpj: {type: String, required: true, unique: true},
    certificate: {type: String, required: true, unique: true}
})

exports.SolutionSchema = mongoose.model('Solution', solution)