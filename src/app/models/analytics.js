import { StoreSchema } from "./store";
import { SaleSchema } from "./sale";
import { ProductSchema } from "./product";

exports.Ticket = (sale) => {
    var income = 0
    var clients = 0

    SaleSchema.find({store: sale.store}, (err, sales) => {
        if(err || !sales) return

        sales.forEach(e => {
            income += e.price != 0 ? e.price : sale.price
            clients += 1
        })
    })

    StoreSchema.findOne({_id: sale.store}, (err, s) => {
        if(err || !s) return

        if(clients != 0)
            s.ticket = income / clients
        else
            s.ticket = 0
        
        s.save()
    })
}

exports.SaleCharge = (sale) => {
    ProductSchema.find({store: sale.store}, (err, products) => {
        var pr = []
        var ss = 0

        products.forEach(i => {
            var obj = {}

            obj._id = i._id
            obj.stock = 0

            pr.push(obj)
        })

        SaleSchema.find({store: sale.store}, (err, sales) => {
            sales.forEach(s => {
                s.products.forEach(i => {
                    pr.forEach(j => {
                        if(i._id == j._id)
                            j.stock += i.qty
                    })
                })
            })

            pr.forEach(i => ss += i.stock)

            products.forEach(i => {
                pr.forEach(j => {
                    if(i._id == j._id)
                    {
                        i.sales_charge = j.stock * 100 / ss
                        i.save()
                    }
                })
            })
        })
    })
}

exports.Stockout = (product) => {
    if(product.stock == 0) {
        product.stockout.push(Date.now())
        // Send some notification
    }
    else if(product.stock <= product.stock_thresholder && product.stock_thresholder_notify) {
        // Send some alert
    }
}

exports.COGS = (taxation, commission, profit_previous) => {
    var cogs = commission + profit_previous

    taxation.forEach(e => {
        cogs += e.cost
    })

    return cogs
}

exports.Markup = (cogs) => {
    return 100/(100 - product.cogs)
}

exports.MinPrice = (cost, markup) => {
    return cost * markup
}