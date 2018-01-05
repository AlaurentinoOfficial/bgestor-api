import {SolutionSchema} from '../models/solution'
import { StoreSchema } from '../models/store';

exports.get = (req, res) => {
    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
            StoreSchema.find({solution: solution}, (err, stores) => {
            if(err)
                return res.status(500).json([])
            
            res.status(200).json(stores)
        })
    })
}

exports.post = (req, res) => {
    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])

            var body = {name: req.body.name, address: req.body.address, solution: solution}
        
            StoreSchema.create(body, (err, stores) => {
            if(err)
                return res.status(500).json({code: 500, error: 'Invalid arguments'})
            
            res.json({code: 200, message: "Succefuly created store"});
        })
    })
}

exports.putById = (req, res) => {
    if(!req.params.id)
        return res.status(400).json({error: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
            StoreSchema.findOneAndUpdate({_id: req.params.id},req.body, {upsert: true}, (err, products) => {
                if(err)
                    return res.status(500).json({error: "Invalid store"})
                
                res.json({message: "Succefuly updated store"
            });
        })
    })
}