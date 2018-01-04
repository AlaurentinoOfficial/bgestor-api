'use strict';

var _solution = require('../models/solution');

var _product = require('../models/product');

exports.get = function (req, res) {
    // SolutionSchema.findOne({user: res.locals.user}, (err, solution) => {
    //     if(err)
    //         return res.status(500).json([])

    //         ProductSchema.find({solution: solution}, (err, products) => {
    //         if(err)
    //             return res.status(500).json([])

    //         res.status(200).json(products)
    //     })
    // })
    res.status(200).json('Acessou');
};