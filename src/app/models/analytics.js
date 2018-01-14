import { StoreSchema } from "./store";
import { SaleSchema } from "./sale";
import { ProductSchema } from "./product";

exports.UpdateTicket = (sales) => {
    var income = 0
    var clients = 0

    StoreSchema.findOne({_id: sales.store}, (err, s) => {
        s.sales.forEach(j => {
            SaleSchema.findOne({_id: j}, (err, sale) => {
                if(err || !sale) return
                income += sale.price
                clients += 1

                s.ticket = income/clients
                s.save()
            })
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
    if(product.stock == 0)
        product.stockout.push(Date.now())

    product.save()
}

exports.Cmv = (product) => {
    product.cmv = 0

    product.cmv += product.profit_previous
    product.cmv += product.pis_confins
    product.cmv += product.icms
    product.cmv += product.ipi
    product.cmv += product.commission
    product.cmv += product.expenses
}

exports.Markup = (product) => {
    var div = (100 - product.cmv)/100
    product.markup = 1 / div
}

exports.MinPrice = (product) => {
    product.min_price = product.cost * product.markup

    if(product.price == 0)
        product.price = product.min_price
}