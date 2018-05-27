import * as jwt from "jsonwebtoken"

import { UserSchema, User } from "../models/user"
import { Server } from "../../server";
import { Strings } from "../config/strings";

exports.Authenticate = Authenticate

function Authenticate(options) {
    return function Authenticate(req, res, next) {
        let token = req.headers["authorization"].replace("CRM ", "")

        jwt.verify(token, Server.get('crypt_key'), (err, result) => {
            if(err || !result) return res.json(Strings.INVALID_TOKEN)

            UserSchema.findOne({_id: result.data}, (er, u) => {
                if(er || !u)
                    return res.json(Strings.INVALID_USER)
                
                res.locals.user = u
                next()
            })
        })
    } 
}