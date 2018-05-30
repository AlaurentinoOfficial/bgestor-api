import * as jwt from "jsonwebtoken"

import { UserSchema, User } from "../models/user"
import { Server } from "../../server";
import { Strings } from "../config/strings";

exports.Authenticate = Authenticate

function Authenticate(options) {
    return function Authenticate(req, res, next) {
        let token = req.headers["authorization"].replace("CRM ", "")

        jwt.verify(token, Server.get('crypt_key'), (err, result) => {
            if(err || !result) return res.json({status: false, value: Strings.INVALID_TOKEN})

            UserSchema.findOne({_id: result.data}, (er, u) => {
                if(er || !u)
                    return res.json({status: false, value: Strings.INVALID_USER})
                
                res.locals.user = u

                if(options.permission !== undefined)
                    if(u.permissions.indexOf(options.permission) == -1)
                        return res.json({status: false, value: Strings.ACCESS_DENIED})

                if(options.limit !== undefined && u[options.limit.property].length > 0)
                    if(u[options.limit.property].indexOf(req.params[options.limit.path]) == -1)
                        return res.json({status: false, value: Strings.ACCESS_DENIED})
                
                next()
            })
        })
    } 
}