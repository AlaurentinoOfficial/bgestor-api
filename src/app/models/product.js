import { COGS, Markup, MinPrice } from "./analytics"
import { Strings } from "../config/strings"

var mongoose = require("mongoose")

var product = new mongoose.Schema({
    store: {type: mongoose.Schema.ObjectId, ref:"Store", childPath:"products", required: true},

    name: {type: String, required: true},
    description: {type: String, default: "", required: true},

    price: {type: Number, default: 0, required: true},
    min_price: {type: Number, default: 0, required: false},
    cost: {type: Number, required: true},
    profit_previous: {type: Number, default: 0, required: false},
    commission: {type: Number, default: 0, require: false},
    taxes: [{type: mongoose.Schema.Types.Mixed, require: false}],

    cogs: {type: Number, default: 0, required: false},
    markup: {type: Number, default: 0, required: false},
    sales_charge: {type: Number, default: 0, required: false},

    enable_validate: {type: Boolean, required: true},
    validate: {type: Date, required: false},
    
    stock_actived: {type: Boolean, default: false, required: true},
    stock: {type: Number, default: 0, required: false},
    stock_history: [{type: mongoose.Schema.Types.Mixed, require: false}],
    stock_recharge: [{type: mongoose.Schema.Types.Mixed, require: false}],
    stock_threshold: {type: Number, required: false},
    stock_threshold_notify: {type: Boolean, default: false, required: true},
    stockout: [{type: Date, default: null, required: false}]
})

product.pre('save', function(next) {
    this.cogs = COGS(this.taxes, this.commission, this.profit_previous)
    this.markup = parseFloat(Markup(this.cogs)).toFixed(5)
    this.min_price = parseFloat(MinPrice(this.cost, this.markup)).toFixed(2)

    if(this.price == 0)
        this.validate = new Date()
    
    if(this.enable_validate)
        this.price = this.min_price

    if(this.stock_actived) {
        if(this.stock == 0) {
            this.stockout.push(new Date())
            // Despatch a notification to admin
        }
        else if(this.stock <= this.stock_threshold && this.stock_threshold_notify) {
            // Despatch a notification to admin
        }

        stock_history.append([{date: new Date(), qty: this.stock}])
    }

    next()
})

product = mongoose.model('Product', product)


/**
 * Custom findOneAndUpte
 * Find one entity and update properties
 * 
 * @param search Query the entity
 * @param update Changes
 * @param cb callback(Error, Obj)
 */
product.findOneNUpdate = (search, update, cb) => {
    product.findOne(search, (err, pro) => {
        if(err) cb(err, null)
        
        for(var body in update)
            for(var pp in pro)
                if(String(pp) == String(body) && String(body) != "_id" && String(body) != "_v" && String(body) != "store")
                    eval("pro." + pp + " = " + "update." + body)

        pro.save()
        cb(null, pro)
    })
}

/**
 * Add in stock
 * Add product in stock
 * 
 * @param search Query the entity
 * @param qty Quantity
 * @param cb callback(Error, Obj)
 */
product.addStock = (search, qty, cb) => {
    ProductSchema.findOne(search, (err, pro) => {
        if(err) cb(err, null)
        
        pro.stock_recharge.push({date: new Date(), qty: Math.abs(qty)})
        pro.stock += Math.abs(qty)
        pro.save()

        cb(null, pro)
    })
}

/**
 * Remove from stock
 * Remove some qty from stock
 * 
 * @param search Query the entity
 * @param qty Quantity
 * @param cb callback(Error, Obj)
 */
product.removeStock = (search, qty, cb) => {
    ProductSchema.findOne(search, (err, pro) => {
        if(err) return cb(err, null)

        if(pro.stock_actived) {
            qty = Math.abs(qty)

            if(pro.stock - qty >= 0) {
                pro.stock -= qty
                pro.save()
    
                return cb(null, pro)
            }
            else
                return cb(Strings.MISSING_STOCK, null)
        }
        else
            return cb(null, pro)
    })
}

/**
 * Check remove from stock
 * Try remove some qty from stock
 * 
 * @param search Query the entity
 * @param qty Quantity
 * @param cb callback(Error, Obj)
 */
product.checkRemove = (search, qty, cb) => {
    ProductSchema.findOne(search, (err, pro) => {
        if(err) return cb(err, null)

        return cb(null, pro.stock - Math.abs(qty) >= 0 && qty !== 0)
    })
}

export let ProductSchema = product