import * as jwt from "jsonwebtoken";
import { Server } from "../../server";

import {SolutionSchema} from '../models/solution'
import {ProductSchema} from '../models/product'

exports.get = (req, res) => {
    let token = req.headers["authorization"].replace("bearer ", "")
    let payload = jwt.verify(token ? token : "", Server.get('crypt_key'))._doc

    SolutionSchema.findOne({user: payload}, (err, solution) => {
        if(err)
            return res.status(500).json([])
        
            ProductSchema.find({solution: solution}, (err, envs) => {
            if(err)
                return res.status(500).json([])
            
            res.status(200).json(envs)
        })
    })
}