var mongoose = require("mongoose")

let notification = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref:"User", childPath:"notifications", required: false},
    title: {type: String, required: true},
    message: {type: String, required: true},
    uri: {type: String, required: false},
    status: {type: Boolean, default: false, required: false},
    createdAt: { type: Date, expires: '10080m', default: Date.now }
}, {versionKey: false})

exports.NotificationSchema = mongoose.model('Notification', notification)