import {SolutionSchema} from '../models/solution'
import {ProductSchema} from '../models/product'
import { StoreSchema } from '../models/store';

exports.get = (req, res) => {
    if(!req.params.store)
        return res.status(400).json({error: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
            StoreSchema.findOne({_id: req.params.store}, (err, store) => {
                if(err)
                    return res.status(500).json({code: 500, error: "Invalid arguments"})

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
        return res.status(400).json({error: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
            StoreSchema.findOne({_id: req.params.store}, (err, store) => {
                if(err)
                    return res.status(500).json({error: "Invalid store"})
                
                var body = {
                    name: req.body.name,
                    amount: req.body.amount,
                    price: req.body.price,
                    description: req.body.description,
                    store: store
                }

                ProductSchema.create(body, (err, products) => {
                    if(err)
                        return res.status(500).json({error: "Invalid product"})
                    
                    res.json({message: "Succefuly created product"
                });
            })
        })
    })
}

exports.putById = (req, res) => {
    if(!req.params.id)
        return res.status(400).json({error: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
            ProductSchema.findOneAndUpdate({_id: req.params.id},req.body, {upsert: true}, (err, products) => {
                if(err)
                    return res.status(500).json({error: "Invalid product"})
                
                res.json({message: "Succefuly updated product"
            });
        })
    })
}