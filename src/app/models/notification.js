var mongoose = require("mongoose")

let notification = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref:"User", childPath:"notifications", required: true},
    title: {type: String, required: true},
    message: {type: String, required: true},
    uri: {type: String, required: false},
    date: {type: Date, required: true},
    status: {type: Boolean, default: false, required: true}
})

exports.NotificationSchema = mongoose.model('Notification', notification)