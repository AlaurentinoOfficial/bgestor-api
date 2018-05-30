import { StoreSchema } from "./store"
import { SaleSchema } from "./sale"
import { ProductSchema } from "./product"

/**
 * Ticket
 * Profit divided by number of customers
 * 
 * @param storeId Store id
 * @param start Start income
 */
exports.Ticket = (storeId, start) => {
    StoreSchema.findOne({_id: storeId}, (err, store) => {
        if(err || !store) return

        SaleSchema.find({store: storeId}, (err, sales) => {
            if(err || !sales) return

            var income = start
            var clients = 0
    
            sales.forEach(e => {
                income += e.price != 0 ? e.price : 0
                clients += 1
            })
            
            store.ticket = clients != 0 ? income/clients : 0
            store.save()
        })
    })
}

/**
 * Sale Charge
 * Proportion of sales of a product in relation to other products
 * 
 * @param taxation Taxes
 * @param commision Commission of each sealesman
 * @param profit_previous Variable profit margin
 */
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

/**
 * Stockout
 * 
 * @param product Log Date when get Stockout
 */
exports.Stockout = (product) => {
    if(product.stock == 0) {
        product.stockout.push(Date.now())
        // Send some notification
    }
    else if(product.stock <= product.stock_thresholder && product.stock_thresholder_notify) {
        // Send some alert
    }
}

/**
 * COGS (Cost of goods sold)
 * Sum of taxes, commissions and profit previous
 * 
 * @param taxation Taxes
 * @param commision Commission of each sealesman
 * @param profit_previous Variable profit margin
 * @returns Porcentage
 */
exports.COGS = (taxation, commission, profit_previous) => {
    var cogs = commission + profit_previous

    taxation.forEach(e => {
        cogs += e.cost
    })

    return cogs
}

/**
 * Markup
 * Markup is the ratio between the cost of a good or service and its selling price
 * 
 * @param cogs COGS (Cost of goods sold)
 * @returns Markup
 */
exports.Markup = (cogs) => {
    return 100/(100 - cogs)
}

/**
 * Minimum Price
 * Caculate min price by cost and markup
 * 
 * @param cost COGS (Cost of goods sold)
 * @param markup Markup
 * @returns Minimum price
 */
exports.MinPrice = (cost, markup) => {
    return cost * markup
}