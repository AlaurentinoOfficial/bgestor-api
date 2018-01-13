import { UpdateProfit, UpdateProfitMarkup } from "./analytics";
import { GetCode } from "../config/Codes";

var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

var product = new mongoose.Schema({
    name: {type: String, required: true},
    stock: {type: Number, required: true},
    average_stock: {type: Number, required: false},
    production_cost: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String, default: "", required: false},
    sales_charge: {type: Number, default: 0, required: false},
    markup: {type: Number, default: 0, required: false},
    profit: {type: Number, default: 0, required: false},
    store: {type: mongoose.Schema.ObjectId, ref:"Store", childPath:"products", required: true, unique: false}
})

product.pre('save', function() {
    let self = this
    
    UpdateProfitMarkup(self)
})

product.plugin(relationship, { relationshipPathName:'store' })
product = mongoose.model('Product', product)

product.findOneAndUpdate = (search, update, cb) => {
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
        if(err) cb(err, null)

        if(pro.stock - Math.abs(stock) >= 0) {
            pro.stock -= Math.abs(stock)
            pro.save()

            cb(null, pro)
        }
        else
            cb({code: GetCode('MISSING_STOCK')})
    })
}

export let ProductSchema = product