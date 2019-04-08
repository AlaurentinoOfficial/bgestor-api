var mongoose = require("mongoose")
import uuid from "node-uuid"

require('mongoose-uuid2')(mongoose)
let UUID = mongoose.Types.UUID

let taxe = new mongoose.Schema({
    _id: { type: UUID, default: uuid.v4 },
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"taxes", required: true},

    name: {type: String, required: true},
    cost: {type: Number, required: true},
    type: {type: String, enum: ['federal', 'state', 'municipal', 'neighborhood', 'other'], require: true}
}, {versionKey: false})

exports.TaxeSchema = mongoose.model('Taxe', taxe)