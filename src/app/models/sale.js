var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

import * as analytics from './analytics'
import { StoreSchema } from "./store"
import { SaleSchema } from "./sale"
import { Ticket, SaleCharge, Stockout } from "./analytics"
import { GetCode } from "../config/Codes";
import { ProductSchema } from "./product";

let sale = new mongoose.Schema({
    client: {type: String, required: true},
    products: [{type: mongoose.Schema.Types.Mixed, required: true}],
    date: {type: Date, default: Date.now(), required: false},
    price: {type: Number, default: 0, required: false},
    store: {type: mongoose.Schema.ObjectId, ref:"Store", childPath:"sales", required: true, unique: false}
})

sale.plugin(relationship, { relationshipPathName:'store' })
sale = mongoose.model('Sale', sale)

sale.new = (body, cb) => {
    var missing = []
    var saves = []
    body.price = 0

    body.products.forEach(product => {
        var qty = Math.abs(product.qty)

        ProductSchema.removeStock({_id: product._id}, qty, (err, p) => {
            if(err && !p)
                missing.push(p)
            else {
                p.qty = qty
                saves.push(p)
            }
        })
    })

    SaleSchema.create(body, (err, sale) => {
        if(err || !sale)
            return cb(GetCode('INVALID_PARAMS'), null)
        
        if(missing.length > 0){
            SaleSchema.remove({_id: sale._id})

            var code = GetCode('MISSING_STOCK')
            code.missing = missing
            return cb(code, null)
        }
        
        saves.forEach(e => {
            Stockout(e)
        })
        
        sale.price = 0
        saves.forEach(p =>  {
            sale.price += Math.abs(p.price * p.qty)
        })
        sale.save()

        Ticket(sale)
        SaleCharge(sale)
        
        cb(null, sale)
    })
}

exports.SaleSchema = sale