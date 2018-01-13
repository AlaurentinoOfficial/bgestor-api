import * as jwt from "jsonwebtoken";

import { Server } from "../../server";
import { UserSchema } from "../models/user";
import { SolutionSchema, Solution } from "../models/solution";
import { GetCode } from "../config/Codes";

exports.login = (req, res) => {
    UserSchema.findOne({email: req.body.email}, (err, user) => {
        if(err || !user)
            return res.json(GetCode('INVALID_EMAIL'))

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch && !err)
            {
                var sName = ""
                SolutionSchema.findOne({_id: user.solution}, (err, solution) => {
                    if(err || !solution) return;
                    sName = solution.name;
                })

                let token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60) * 3,
                                data: user._id
                            }, Server.get('crypt_key'))
    
                user.password = null
                user.token = token
                return res.json(user)
            }
            else
                return res.json(GetCode('INVALID_PASSWORD'))
        });
    });
}

exports.password = (req, res) => {
    var body = {password: req.body.password}

    UserSchema.findOneAndUpdate({_id: res.locals.user._id}, body, (err, user) => {
        if(err || !user)
            return res.json(GetCode('INVALID_USER'))
        
        res.json(GetCode('SUCCEFULY'))
    })
}