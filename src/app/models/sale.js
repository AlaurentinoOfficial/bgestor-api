var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

import * as analytics from './analytics'
import { StoreSchema } from "./store"
import { SaleSchema } from "./sale"
import { UpdateTicket, UpdateSaleCharge } from "./analytics"

let sale = new mongoose.Schema({
    client: {type: String, required: true},
    products: [{type: mongoose.Schema.Types.Mixed, required: true}],
    date: {type: Date, default: Date.now(), required: true},
    price: {type: Number, required: true},
    store: {type: mongoose.Schema.ObjectId, ref:"Store", childPath:"sales", required: true, unique: false}
})

sale.post('save', function() {
    var self = this

    UpdateTicket(self)
    UpdateSaleCharge(self)
})

sale.plugin(relationship, { relationshipPathName:'store' })
exports.SaleSchema = mongoose.model('Sale', sale)