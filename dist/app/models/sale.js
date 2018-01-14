"use strict";

var _analytics = require("./analytics");

var analytics = _interopRequireWildcard(_analytics);

var _store = require("./store");

var _sale = require("./sale");

var _Codes = require("../config/Codes");

var _product = require("./product");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");

var sale = new mongoose.Schema({
    client: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    date: { type: Date, default: Date.now(), required: false },
    price: { type: Number, default: 0, required: false },
    store: { type: mongoose.Schema.ObjectId, ref: "Store", childPath: "sales", required: true, unique: false }
});

sale.plugin(relationship, { relationshipPathName: 'store' });
sale = mongoose.model('Sale', sale);

sale.new = function (body, cb) {
    var missing = [];
    var saves = [];
    body.price = 0;

    body.products.forEach(function (product) {
        var qty = Math.abs(product.qty);

        _product.ProductSchema.removeStock({ _id: product._id }, qty, function (err, p) {
            if (err && !p) missing.push(p);else {
                p.qty = qty;
                saves.push(p);
            }
        });
    });

    _sale.SaleSchema.create(body, function (err, sale) {
        if (err || !sale) return cb((0, _Codes.GetCode)('INVALID_PARAMS'), null);

        if (missing.length > 0) {
            _sale.SaleSchema.remove({ _id: sale._id });

            var code = (0, _Codes.GetCode)('MISSING_STOCK');
            code.missing = missing;
            return cb(code, null);
        }

        saves.forEach(function (e) {
            (0, _analytics.Stockout)(e);
        });

        sale.price = 0;
        saves.forEach(function (p) {
            sale.price += Math.abs(p.price * p.qty);
        });
        sale.save();

        (0, _analytics.UpdateTicket)(sale);
        (0, _analytics.UpdateSaleCharge)(sale);

        cb(null, sale);
    });
};

exports.SaleSchema = sale;