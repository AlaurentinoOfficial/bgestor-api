import { UpdateProfit, UpdateProfitMarkup, COGS, Markup, MinPrice } from "./analytics";
import { Strings } from "../config/strings";

var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

var product = new mongoose.Schema({
    store: {type: mongoose.Schema.ObjectId, ref:"Store", childPath:"products", required: true, unique: false},
    name: {type: String, required: true},
    description: {type: String, default: "", required: false},

    price: {type: Number, default: 0, required: false},
    min_price: {type: Number, default: 0, required: false},
    cost: {type: Number, required: true},
    profit_previous: {type: Number, default: 0, required: true},
    commission: {type: Number, default: 0, require: true},
    taxation: [{type: mongoose.Schema.Types.Mixed, require: true}],

    cogs: {type: Number, default: 0, required: false},
    markup: {type: Number, default: 0, required: false},
    sales_charge: {type: Number, default: 0, required: false},
    
    stock: {type: Number, required: true},
    stock_threshold: {type: Number, required: false},
    stock_threshold_notify: {type: Boolean, required: true},
    stockout: [{type: Date, required: false}]
})

product.pre('save', function() {
    let self = this
    
    self.cogs = COGS(self.taxation, self.commission, self.profit_previous)
    self.markup = Markup(self.cogs)
    self.min_price = MinPrice(self.cost, self.markup)

    if(self.price == 0) self.price = self.min_price

    product.save()
})

product.plugin(relationship, { relationshipPathName:'store' })
product = mongoose.model('Product', product)

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

product.addStock = (search, stock, cb) => {
    ProductSchema.findOne(search, (err, pro) => {
        if(err) cb(err, null)
        
        pro.stock += Math.abs(stock)
        pro.save()

        cb(null, pro)
    })
}

product.removeStock = (search, stock, cb) => {
    ProductSchema.findOne(search, (err, pro) => {
        if(err) return cb(err, null)

        if(pro.stock - Math.abs(stock) >= 0) {
            pro.stock -= Math.abs(stock)
            //pro.save()

            return cb(null, pro)
        }
        else
            return cb(Strings.MISSING_STOCK, null)
    })
}

export let ProductSchema = product