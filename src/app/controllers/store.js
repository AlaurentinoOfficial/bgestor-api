import { SolutionSchema } from '../models/solution'
import { StoreSchema } from '../models/store'
import { Strings } from '../config/strings'

exports.get = (req, res) => {
    StoreSchema.find({solution: res.locals.user.solution}, (err, stores) => {
        if(err || !stores)
            return res.json([])
        
        res.json(stores)
    })
}

exports.post = (req, res) => {
    var body = {name: req.body.name, address: req.body.address, solution: res.locals.user.solution}
        
    StoreSchema.create(body, (err, stores) => {
        if(err || !stores)
            return res.json(Strings.INVALID_PARAMS)
        
        res.json(Strings.SUCCEFULY)
    })
}

exports.putById = (req, res) => {
    StoreSchema.findOneAndUpdate({_id: req.params.id},req.body, {upsert: true}, (err, products) => {
        if(err || !products)
            return res.json(Strings.INVALID_PARAMS)
        
        res.json(Strings.SUCCEFULY)
    })
}