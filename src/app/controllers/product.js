import { ProductSchema } from '../models/product'
import { Strings } from '../config/strings'
import { StoreSchema } from '../models/store';

exports.getAll = (req, res) => {
    // Find products
    StoreSchema.findOne({_id: req.params.store, solution: res.locals.user.solution}, (err, store) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_STORE})
        
        ProductSchema.find({store: req.params.store}, (e, products) => {
            if(e || !products)
                return res.json({status: true, value: Strings.INTERNAL_ERROR, products: []})
    
            // Get only the attributes
            productsDoc = products._doc
    
            // Calculate how many days ago of the last recharge
            productsDoc.forEach(p => {
                const size = p.stock_recharge.length
    
                if(size > 0) {
                    p.last_recharge = (new Date() - p.stock_recharge[size-1]) / (24 * 60 * 60 * 1000)
                }
            })
    
            res.json({status: true, value: Strings.SUCCEFULY, products: {productsDoc}})
        })
    })
}

exports.addNew = (req, res) => {
    StoreSchema.findOne({_id: req.params.store, solution: res.locals.user.solution}, (err, store) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_STORE})

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
    StoreSchema.findOne({_id: req.params.store, solution: res.locals.user.solution}, (err, store) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_STORE})
        
        ProductSchema.findOneNUpdate({_id: req.params.id}, req.body, (err, p) => {
            if(err)
                return res.json({status: false, value: Strings.INVALID_PARAMS})
            
            res.json({status: false, value: Strings.SUCCEFULY})
        })
    })
}

exports.addInStockById = (req, res) => {
    // Update the stock
    StoreSchema.findOne({_id: req.params.store, solution: res.locals.user.solution}, (err, store) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_STORE})
        
        ProductSchema.addStock({store: req.params.store, _id: req.params.id}, req.body.stock, (err, p) => {
            if(err)
                return res.json({status: false, value: Strings.INVALID_PARAMS})
            
            res.json({status: true, value: Strings.SUCCEFULY})
        })
    })
}

exports.deleteById = (req, res) => {
    StoreSchema.findOne({_id: req.params.store, solution: res.locals.user.solution}, (err, store) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_STORE})
        
        ProductSchema.remove({_id: req.params.id}, (err, docs) => {
            if(err)
                return res.json({status: false, value: Strings.INVALID_PRODUCT})
        
            res.json({status: true, value: Strings.SUCCEFULY})
        })
    })
}