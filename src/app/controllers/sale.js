import { StoreSchema } from '../models/store'
import { SaleSchema } from '../models/sale'
import { Strings } from '../config/strings'

exports.getAll = (req, res) => {
    StoreSchema.findOne({_id: req.params.store}, (err, store) => {
        if(err) return res.json({status: false, value: Strings.INVALID_STORE})

        SaleSchema.find({store: store}, (err, sales) => {
            if(err)
                return res.json({status: true, value: Strings.INTERNAL_ERROR, products: []})

            res.json({status: true, value: Strings.SUCCEFULY, sales: sales})
        })
    })
}

exports.sell = (req, res) => {
    if(!req.body.client || !req.body.products)
        return res.json({status: false, value: Strings.INVALID_PARAMS})

    StoreSchema.findOne({_id: req.params.store}, (err, store) => {
        if(err || !store) return res.json({status: false, value: Strings.INVALID_STORE})

        req.body.store = store
        req.body.solution = res.locals.user.solution
        SaleSchema.createSell(req.body, (er, sale) => {
            if(er || !sale)
                return res.json({status: false, value: er})
            
            res.json({status: true, value: Strings.SUCCEFULY})
        })
    })
}