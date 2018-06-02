import { SolutionSchema } from '../models/solution'
import { ProductSchema } from '../models/product'
import { StoreSchema } from '../models/store'
import { Strings } from '../config/strings'

exports.getAll = (req, res) => {
    if(!req.params.store)
        return res.json({status: false, value: Strings.INVALID_PARAMS})

    // Check if there is that store
    StoreSchema.findOne({_id: req.params.store}, (er, store) => {
        if(er || !store)
            return res.json({status: false, value: Strings.INVALID_PARAMS})

        // Find products
        ProductSchema.find({store: store._id}, (e, products) => {
            if(e || !products)
                return res.json({status: true, value: []})

            // Get only the attributes
            productsDoc = products._doc

            // Calculate how many days ago of the last recharge
            productsDoc.forEach(p => {
                const size = p.stock_recharge.length

                if(size > 0) {
                    p.last_recharge = (new Date() - p.stock_recharge[size-1]) / (24 * 60 * 60 * 1000)
                }
            })
            
            res.json({status: true, value: productsDoc})
        })
    })
}

exports.addNew = (req, res) => {
    // Check if there is that store
    StoreSchema.findOne({_id: req.params.store}, (er, store) => {
        if(er || !store)
            return res.json({status: false, value: Strings.INVALID_STORE})
        
        // Add store id in the product 
        req.body.store = store

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
    ProductSchema.findOneNUpdate({_id: req.params.id}, req.body, (err, p) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: false, value: Strings.SUCCEFULY})
    })
}

exports.addInStockById = (req, res) => {
    // Update the stock
    ProductSchema.addStock({_id: req.params.id}, req.body.stock, (err, p) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}