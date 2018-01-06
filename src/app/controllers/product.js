import {SolutionSchema} from '../models/solution'
import {ProductSchema} from '../models/product'
import { StoreSchema } from '../models/store';
import { GetCode } from '../config/Codes';

exports.get = (req, res) => {
    if(!req.params.store)
        return res.status(400).json({code: GetCode('MISSING_ARGUMENTS'), message: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
            StoreSchema.findOne({_id: req.params.store}, (err, store) => {
                if(err)
                    return res.status(500).json({code: GetCode('MISSING_ARGUMENTS'), message: "Invalid arguments"})

                ProductSchema.find({store: store}, (err, products) => {
                    if(err)
                        return res.status(500).json([])
                    
                    res.status(200).json(products)
            })
        })
    })
}

exports.post = (req, res) => {
    if(!req.params.store)
        return res.status(400).json({code: GetCode('MISSING_ARGUMENTS'), message: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (e, solution) => {
        if(e)
            return res.status(500).json([])
        
        StoreSchema.findOne({_id: req.params.store}, (er, store) => {
            if(er)
                return res.status(500).json({code: GetCode('INVALID_STORE'), message: "Invalid store"})
            
            req.body.store = store

            ProductSchema.create(req.body, (err, products) => {
                if(err)
                    return res.status(500).json({code: GetCode('MISSING_ARGUMENTS'), message: "Invalid arguments"})
                
                res.json({code: GetCode('SUCCEFULY'), message: "Succefuly created product"});
            })
        })
    })
}

exports.putById = (req, res) => {
    if(!req.params.id)
        return res.status(400).json({code: GetCode('MISSING_ARGUMENTS'), message: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])

            ProductSchema.findOneAndUpdate({_id: req.params.id}, req.body, (err, p) => {
                if(err)
                    return res.status(500).json({code: GetCode('MISSING_ARGUMENTS'), message: "Invalid arguments"})
                
                res.json({code: GetCode('SUCCEFULY'), message: "Succefuly updated product"})
            })
    })
}

exports.postById = (req, res) => {
    if(!req.params.id || typeof(req.body.stock) != typeof(10))
        return res.status(400).json({code: GetCode('MISSING_ARGUMENTS'), message: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])

            console.log(ProductSchema.aa)

            ProductSchema.addStock({_id: req.params.id}, req.body.stock, (err, p) => {
                if(err)
                    return res.status(500).json({code: GetCode('MISSING_ARGUMENTS'), message: "Invalid arguments"})
                
                res.json({code: GetCode('SUCCEFULY'), message: "Succefuly added in stock"})
            })
    })
}