"use strict";

var _analytics = require("./analytics");

var analytics = _interopRequireWildcard(_analytics);

var _store = require("./store");

var _sale = require("./sale");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");

var sale = new mongoose.Schema({
    client: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.Mixed, required: true }],
    date: { type: Date, default: Date.now(), required: true },
    price: { type: Number, required: true },
    store: { type: mongoose.Schema.ObjectId, ref: "Store", childPath: "sales", required: true, unique: false }
});

sale.post('save', function () {
    var self = this;

    (0, _analytics.UpdateTicket)(self);
    (0, _analytics.UpdateSaleCharge)(self);
});

sale.plugin(relationship, { relationshipPathName: 'store' });
exports.SaleSchema = mongoose.model('Sale', sale);