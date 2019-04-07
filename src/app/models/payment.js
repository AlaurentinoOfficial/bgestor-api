var mongoose = require("mongoose")

let payment = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"payments", required: true},

    name: {type: String, required: true},
    cost: {type: Number, required: true}
})

exports.PaymentSchema = mongoose.model('Payment', payment)