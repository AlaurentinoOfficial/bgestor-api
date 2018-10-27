import * as jwt from "jsonwebtoken"

import { UserSchema } from "../models/user"
import { Server } from "../../server";
import { Strings } from "../config/strings";

exports.Authenticate = Authenticate

function Authenticate(options) {
    return function Authenticate(req, res, next) {
        // Try to convert the token
        jwt.verify(req.headers["authorization"], Server.get('crypt_key'), (err, result) => {
            if(err || !result) return res.json({status: false, value: Strings.INVALID_TOKEN})
            // Verify if there is that user with that _id
            UserSchema.findOne({_id: result.data}, (er, u) => {
                if(er || !u)
                    return res.json({status: false, value: Strings.INVALID_TOKEN})

                // Verifify the permission of this user
                if(options.permission !== undefined)
                    if(u.permissions.indexOf(options.permission) == -1)
                        return res.json({status: false, value: Strings.ACCESS_DENIED})

                // Verify if there is a limitation
                // if(options.limit !== undefined && u[options.limit.property].length > 0)
                //     if(u[options.limit.property].indexOf(req.params[options.limit.path]) == -1)
                //         return res.json({status: false, value: Strings.ACCESS_DENIED})
                
                // Save the user to pass to anothers middleware 
                res.locals.user = u

                next()
            })
        })
    } 
}