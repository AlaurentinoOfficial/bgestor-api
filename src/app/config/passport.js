import * as jwt from "jsonwebtoken"

import { UserSchema, User } from "../models/user"
import { Server } from "../../server";
import { GetCode } from "./Codes";

exports.Authenticate = Authenticate

function Authenticate(options) {
    return function Authenticate(req, res, next) {
        let token = req.headers["authorization"].replace("CRM ", "")

        jwt.verify(token, Server.get('crypt_key'), (err, result) => {
            if(err || !result) return res.json({code: GetCode('INVALID_TOKEN'), message: "Invalid token"})

            UserSchema.findOne({_id: result.data}, (er, u) => {
                if(er || !u)
                    return res.json(GetCode('USER_BLOCK'))

                if(!u.block)
                    return res.json(GetCode('USER_BLOCK'))
                
                if(options.level != undefined)
                    if(!u.compareLevel(options.level))
                        return res.json(GetCode('ACCESS_DENIED'))
                
                res.locals.user = u
                next()
            })
        })
    } 
}