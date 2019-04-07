import { TaxeSchema } from '../models/taxes'

exports.getAll = (req, res) => {
    TaxeSchema.find({solution: res.locals.user.solution}, (err, payments) => {
        if (err || payments.length == 0)
            return res.json([])
        
        res.json(payments)
    })
}

exports.addNew = (req, res) => {
    req.body.solution = res.locals.user.solution

    TaxeSchema.create(req.body, (err, payment) => {
        if(err || !payment)
            return res.json({status: false, value: err.code == 11000 ? Strings.ALREADY_CREATED : Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}

exports.updateById = (req, res) => {
    req.body.solution = res.locals.user.solution

    TaxeSchema.findOneAndUpdate({solution: res.locals.user.solution, _id: req.params.id}, req.body, (err, user) => {
        if(err || !user)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}

exports.deleteById = (req, res) => {
    TaxeSchema.remove({solution: res.locals.user.solution, _id: req.params.id}, (err) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_TAXE})
    
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}