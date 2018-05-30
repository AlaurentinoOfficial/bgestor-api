import { SolutionSchema } from '../models/solution'
import { ProductSchema } from '../models/product'
import { StoreSchema } from '../models/store'
import { Strings } from '../config/strings'

exports.getAll = (req, res) => {
    if(!req.params.store)
        return res.json({status: false, value: Strings.INVALID_PARAMS})

    StoreSchema.findOne({_id: req.params.store}, (er, store) => {
        if(er || !store)
            return res.json({status: false, value: Strings.INVALID_PARAMS})

        ProductSchema.find({store: store}, (e, products) => {
            if(e || !products)
                return res.json({status: true, value: []})
            
            res.json({status: true, value: products})
        })
    })
}

exports.addNew = (req, res) => {
    StoreSchema.findOne({_id: req.params.store}, (er, store) => {
        if(er || !store)
            return res.json({status: false, value: Strings.INVALID_STORE})
        
        req.body.store = store
        ProductSchema.create(req.body, (err, products) => {
            if(err)
                return res.json({status: false, value: Strings.INVALID_PARAMS})
            
            res.json({status: true, value: Strings.SUCCEFULY})
        })
    })
}

exports.putById = (req, res) => {
    ProductSchema.findOneNUpdate({_id: req.params.id}, req.body, (err, p) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: false, value: Strings.SUCCEFULY})
    })
}

exports.addInStockById = (req, res) => {
    ProductSchema.addStock({_id: req.params.id}, req.body.stock, (err, p) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}