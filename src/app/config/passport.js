import * as jwt from "jsonwebtoken"

import { UserSchema, User } from "../models/user"
import { Server } from "../../server";

exports.Authenticate = (req, res, next) => {
    let token = req.headers["authorization"].replace("CRM ", "")
    let verify = jwt.verify(token, Server.get('crypt_key'), (err, result) => {
        if(err)
            return res.status(401).send('Unauthorized')

        UserSchema.findOne({_id: result.data}, (err, u) => {
            if(err)
                return res.status(401).send('Unauthorized')
            
            res.locals.user = u
            next()
        })
    })
}