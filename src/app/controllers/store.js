import { SolutionSchema } from '../models/solution'
import { StoreSchema } from '../models/store'
import { Strings } from '../config/strings'

exports.get = (req, res) => {
    StoreSchema.find({solution: res.locals.user.solution}, (err, stores) => {
        if(err || !stores)
            return res.json({status: true, value: []})
        
        res.json({status: true, value: stores})
    })
}

exports.post = (req, res) => {
    var body = {name: req.body.name, address: req.body.address, solution: res.locals.user.solution}
        
    StoreSchema.create(body, (err, stores) => {
        if(err || !stores)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}

exports.putById = (req, res) => {
    StoreSchema.findOneAndUpdate({_id: req.params.id},req.body, {upsert: true}, (err, products) => {
        if(err || !products)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}