var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

import { SaleSchema } from "./sale"
import { Ticket, SaleCharge } from "./analytics"
import { Strings } from "../config/strings"
import { ProductSchema } from "./product"

let sale = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"sales", required: true},
    store: {type: mongoose.Schema.ObjectId, ref:"Store", childPath:"sales", required: true},
    
    client: {type: String, required: true},
    date: {type: Date, default: Date.now(), required: false},
    price: {type: Number, default: 0, required: false},
    products: [{type: mongoose.Schema.Types.Mixed, required: true}],
})

sale.plugin(relationship, { relationshipPathName:['store', 'solution'] })
sale = mongoose.model('Sale', sale)

/**
 * Sell
 * Make a NEW sale
 * 
 * @param body New entity
 * @param cb callback(Error, Obj)
 */
sale.createSell = (body, cb) => {
    var missing = []
    body.price = 0

    body.products.forEach(product => {
        ProductSchema.checkRemove({_id: product._id}, product.qty, (err, status) => {
            if(!status || err)
                missing.push(product._id)
        })
    })

    SaleSchema.create(body, (err, sale) => {
        if(err || !sale)
            return cb(Strings.INVALID_PARAMS, null)
        
        if(missing.length > 0){
            SaleSchema.remove({_id: sale._id})
            return cb({err: Strings.MISSING_STOCK, products: missing}, null)
        }

        ProductSchema.find({solution: sale.solution}, (err, products) => {
            if(err) {
                SaleSchema.remove({_id: sale._id})
                return cb({err: Strings.MISSING_STOCK, products: missing}, null)
            }

            sale.price = 0
            products.forEach(p => {
                body.products.forEach(product => {
                    if(product._id == p._id) {
                        ProductSchema.removeStock({_id: p._id}, product.qty, (err, ret) => {})
                        sale.price += Math.abs(p.price * product.qty)
                    }
                })
            })
            sale.save() //

            Ticket(sale.store, sale.price)
            SaleCharge(sale.store)
            
            return cb(null, sale)
        })
    })
}

exports.SaleSchema = sale