var mongoose = require("mongoose")
import uuid from "node-uuid"

require('mongoose-uuid2')(mongoose)
let UUID = mongoose.Types.UUID

let payment = new mongoose.Schema({
    _id: { type: UUID, default: uuid.v4 },
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"payments", required: true},

    name: {type: String, required: true},
    cost: {type: Number, required: true},
    time_to_receive: {type: Number, required: true},
    type: {type: String, enum: ['money', 'creditcard', 'debitcard', 'ticket', 'paypal', 'other'], require: true}
}, {versionKey: false})

exports.PaymentSchema = mongoose.model('Payment', payment)