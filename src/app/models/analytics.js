import { StoreSchema } from "./store";
import { SaleSchema } from "./sale";
import { ProductSchema } from "./product";
import { X_OK } from "constants";

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
            obj.stock = 0

            pr.push(obj)
        })

        SaleSchema.find({store: sale.store}, (err, sales) => {
            sales.forEach(s => {
                s.products.forEach(i => {
                    pr.forEach(j => {
                        if(i._id == j._id)
                            j.stock += i.stock
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

exports.UpdateProfitMarkup = (product) => {
    product.markup = product.price - product.production_cost
    product.profit = product.markup * 100 / product.price
    product.save()
}