import {SolutionSchema} from '../models/solution';
import {StoreSchema} from '../models/store';
import {SaleSchema} from '../models/sale';
import {ProductSchema} from '../models/product';

exports.get = (req, res) => {
    if(!req.params.store)
        return res.status(400).json({code: 400, error: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
        StoreSchema.findOne({_id: req.params.store}, (err, store) => {
            if(err) return res.status(500).json({code: 500, error: "Invalid arguments"})

            SaleSchema.find({store: store}, (err, sales) => {
                if(err)
                    return res.status(500).json([])
                
                return res.status(200).json(sales)
            })
        })
    })
}

exports.post = (req, res) => {
    if(!req.params.store || !req.body.client || !req.body.products)
        return res.status(400).json({code: 400, error: "Missing arguments"})

    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
        StoreSchema.findOne({_id: req.params.store}, (err, store) => {
            if(err) return res.status(500).json({code: 500, error: "Invalid arguments"})

            var body =
            {
                client: req.body.client,
                products: req.body.products,
                price: 0,
                date: Date.now(),
                store: store
            }

            var missing = []
            var saves = []
            body.products.forEach(e => {
                ProductSchema.findOne({_id: e._id}, (err, p) => {
                    if(err) return console.log('Error')

                    if(p.amount - Math.abs(e.amount) >= 0)
                    {
                        p.amount -= Math.abs(e.amount)
                        saves.push(p)
                    }
                    else
                        missing.push(p)
                })

                body.price += Math.abs(e.amount) * e.price
            });
            
            SaleSchema.create(body, (err, sale) => {
                if(saves.length == body.products.length)
                    saves.forEach(e => e.save())
                else
                    return res.status(500).json({code: 500, error: "Product missing from inventory", products: missing})

                if(err) {
                    console.log(err)
                    return res.status(500).json({code: 500, error: "Invalid paramters"})
                }
                
                return res.status(200).json({code: 200, message: "Successful transaction"})
            })
        })
    })
}

exports.saleRate = (req, res) => {
    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
            StoreSchema.findOne({_id: req.params.store}, (err, store) => {
                if(err) return res.status(500).json({code: 500, error: "Invalid arguments"})

                SaleSchema.find({store, store}, (err, sales) => {
                    if(err) return res.status(200).json([])

                    

                    return res.status(200).json(products)
                })
        })
    })
}

exports.ticket = (req, res) => {
    SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
            StoreSchema.findOne({_id: req.params.store}, (err, store) => {
                if(err) return res.status(500).json({code: 500, error: "Invalid arguments"})

                SaleSchema.find({store, store}, (err, sales) => {
                    if(err) return res.status(200).json([])

                    var income = 0
                    var clients = 0
                    sales.forEach(i => {
                        income += i.price
                        ++clients
                    })

                    return res.status(200).json({ticket: (income/clients)})
                })
        })
    })
}