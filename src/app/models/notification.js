var mongoose = require("mongoose")
import uuid from "node-uuid"

require('mongoose-uuid2')(mongoose)
let UUID = mongoose.Types.UUID

let notification = new mongoose.Schema({
    _id: { type: UUID, default: uuid.v4 },
    user: {type: mongoose.Schema.ObjectId, ref:"User", childPath:"notifications", required: false},
    title: {type: String, required: true},
    message: {type: String, required: true},
    uri: {type: String, required: false},
    status: {type: Boolean, default: false, required: false},
    createdAt: { type: Date, expires: '10080m', default: Date.now }
}, {versionKey: false})

exports.NotificationSchema = mongoose.model('Notification', notification)