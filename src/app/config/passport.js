import * as jwt from "jsonwebtoken"

import { UserSchema, User } from "../models/user"
import { Server } from "../../server";
import { GetCode } from "./Codes";

exports.Authenticate = (req, res, next) => {
    // Get the token
    let token = req.headers["authorization"].replace("CRM ", "")

    // Verify the token
    jwt.verify(token, Server.get('crypt_key'), (err, result) => {
        // Invalid token
        if(err) return res.json({code: GetCode('INVALID_TOKEN'), message: "Invalid token"})

        UserSchema.findOne({_id: result.data}, (er, u) => {
            if(er || !u)
                return res.json({code: GetCode('INVALID_USER'), message: 'Invalid user'})

            if(!u.status)
                return res.json({code: GetCode('USER_UNCHECKED'), message: 'User blocked'})
            
            res.locals.user = u
            next()
        })
    })
}