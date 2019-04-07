var mongoose = require("mongoose")

let payment = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"payments", required: true},

    name: {type: String, required: true},
    cost: {type: Number, required: true},
    time_to_receive: {type: Number, required: true},
    type: {type: String, enum: ['money', 'creditcard', 'debitcard', 'ticket', 'paypal', 'other'], require: true}
})

exports.PaymentSchema = mongoose.model('Payment', payment)