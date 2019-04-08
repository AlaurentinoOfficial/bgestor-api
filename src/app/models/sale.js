var mongoose = require("mongoose")

import { SaleSchema } from "./sale"
import { Ticket, SaleCharge } from "./analytics"
import { Strings } from "../config/strings"
import { ProductSchema } from "./product"
import { PaymentSchema } from "./payment"

let sale = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"sales", required: true},
    store: {type: mongoose.Schema.ObjectId, ref:"Store", childPath:"sales", required: true},
    
    client: {type: String, required: true},
    date: {type: Date, default: Date.now(), required: false},
    price: {type: Number, default: 0, required: false},
    products: [{type: mongoose.Schema.Types.Mixed, required: true}],
    taxes: [{type: mongoose.Schema.Types.Mixed, required: true}],
    payment_method: {type: String, required: true}
})

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

    invalid_taxes = InvalidTaxes(body.taxes)
    if (invalid_taxes.length != 0) {
        return cb({err: Strings.INVALID_TAXE, taxes: invalid_taxes}, null)
    }

    PaymentSchema.findOne({solution: sale.solution, _id: payment_method}, (err, payment) => {
        if(err || !payment)
            return cb({err: Strings.INVALID_PAYMENT}, null)
        
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
                sale.save()
    
                Ticket(sale.store, sale.price)
                SaleCharge(sale.store)
                
                return cb(null, sale)
            })
        })
    })
}

exports.SaleSchema = sale

/**
 * InvalidTaxes
 * Returns the invlid taxes
 * 
 * @param taxes Taxes: [{name: String, cost: Number}]
 * @returns Invalid Taxes: [{name: String, cost: Number}]
 */
var InvalidTaxes = (taxes) => {
    var invalid_taxes = []
    
    taxes.forEach(t => {
        if(!(t.name !== undefined && t.cost !== undefined && t.cost.constructor === Number))
            invalid_taxes.push(t)
    })

    return invalid_taxes
}
exports.InvalidTaxes = InvalidTaxes