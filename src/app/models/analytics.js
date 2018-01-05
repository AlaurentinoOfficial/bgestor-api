import { StoreSchema } from "./store";
import { SaleSchema } from "./sale";
import { ProductSchema } from "./product";

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

exports.UpdateSaleCharge = (sale) => {
    ProductSchema.find({store: sale.store}, (err, products) => {
        var pr = []
        var ss = 0

        products.forEach(i => {
            var obj = {}

            obj._id = i._id
            obj.amount = 0

            pr.push(obj)
        })

        SaleSchema.find({store: sale.store}, (err, sales) => {
            sales.forEach(s => {
                s.products.forEach(i => {
                    pr.forEach(j => {
                        if(i._id == j._id)
                            j.amount += i.amount
                    })
                })
            })

            pr.forEach(i => ss += i.amount)

            products.forEach(i => {
                pr.forEach(j => {
                    if(i._id == j._id)
                    {
                        i.sales_charge = j.amount * 100 / ss
                        i.save()
                    }
                })
            })
        })
    })
}