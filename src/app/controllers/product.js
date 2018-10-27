import { ProductSchema } from '../models/product'
import { Strings } from '../config/strings'
import { StoreSchema } from '../models/store';

exports.getAll = (req, res) => {
    if(!req.params.store)
        return res.json({status: false, value: Strings.INVALID_PARAMS})

    // Find products
    ProductSchema.find({store: req.params.store}, (e, products) => {
        if(e || !products) {
            var r = Stringd.INTERNAL_ERROR
            r.products = []

            return res.json({status: true, value: r})
        }

        // Get only the attributes
        productsDoc = products._doc

        // Calculate how many days ago of the last recharge
        productsDoc.forEach(p => {
            const size = p.stock_recharge.length

            if(size > 0) {
                p.last_recharge = (new Date() - p.stock_recharge[size-1]) / (24 * 60 * 60 * 1000)
            }
        })

        var r = Strings.SUCCEFULY
        r.products = productsDoc

        res.json({status: true, value: r})
    })
}

exports.addNew = (req, res) => {
    StoreSchema.findOne({_id: req.params.store}, (err, store) => {
        if(err) return res.json({status: false, value: Strings.INVALID_STORE})

        // Add store id in the product 
        req.body.store = store._id 

        // Create a new product
        ProductSchema.create(req.body, (err, products) => {
            if(err)
                return res.json({status: false, value: Strings.INVALID_PARAMS})
            
            res.json({status: true, value: Strings.SUCCEFULY})
        })
    })
}

exports.putById = (req, res) => {
    // Custom method to update with some restrictions
    ProductSchema.findOneNUpdate({store: req.params.store, _id: req.params.id}, req.body, (err, p) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: false, value: Strings.SUCCEFULY})
    })
}

exports.addInStockById = (req, res) => {
    // Update the stock
    ProductSchema.addStock({store: req.params.store, _id: req.params.id}, req.body.stock, (err, p) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}