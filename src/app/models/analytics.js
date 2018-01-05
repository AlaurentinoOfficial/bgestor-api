import { StoreSchema } from "./store";
import { SaleSchema } from "./sale";

exports.UpdateTicket = (sales) => {
    StoreSchema.findOne({_id: sales.store}, (err, s) => {
        var income = 0
        var clients = 0
        s.sales.forEach(j => {
            SaleSchema.findOne({_id: j}, (err, sale) => {
                income += sale.price
                clients += 1
            })
        })

        StoreSchema.findOne({_id: sales.store}, (err, ss) => {
            ss.ticket = income/clients
            ss.save()
        })
    })
}

exports.UpdateSaleRate = (sales) => {
    var products = []
    sales.forEach(i => {
        i.products.forEach(j => {
            if(products.length > 0) {
                products.forEach(k => {
                    if(k._id == j._id)
                        products.push(j)
                    else
                        k.amount += j.amount
                })
            }
            else products.push(j)
        })
    })

    var num_sales = 0
    products.forEach(i => num_sales += i.amount)

    products.forEach(i => {
        i.sale_rate = (i.amount * 100) / num_sales
    })

    return products
}