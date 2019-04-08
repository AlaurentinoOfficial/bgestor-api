var mongoose = require("mongoose")
import uuid from "node-uuid"

require('mongoose-uuid2')(mongoose)
let UUID = mongoose.Types.UUID

let solution = new mongoose.Schema({
    _id: { type: UUID, default: uuid.v4 },
    name: {type: String, required: true, unique: false},
    cnpj: {type: String, required: true, unique: true},

    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    neighborhood: {type: String, required: true},
    street: {type: String, required: true},
    number: {type: Number, required: true},
    complement: {type: String, required: true},

    stores_limit: {type: Number, required: true},
    products_limit: {type: Number, required: true},
    monthly_price: {type: Number, required: true},
    certificate: {type: String, required: true, unique: true}
}, {versionKey: false})

exports.SolutionSchema = mongoose.model('Solution', solution)