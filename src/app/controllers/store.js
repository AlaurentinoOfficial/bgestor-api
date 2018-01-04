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
                return res.status(500).json({error: 'missing arguments'})
            
                res.json({message: "Succefuly created environment!"});
        })
    })
}