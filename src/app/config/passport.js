import * as jwt from "jsonwebtoken"

import { UserSchema, User } from "../models/user"
import { Server } from "../../server";

exports.Authenticate = (req, res, next) => {
    try
    {
        let token = req.headers["authorization"].replace("CRM ", "")
        let verify = jwt.verify(token, Server.get('crypt_key'))
        
        UserSchema.findOne({_id: verify.data}, (err, u) => {
            if(err)
                res.status(401).send('Unauthorized')
            
            res.locals.user = u
            next();
        })
    } catch(e) {
        res.status(401).send('Unauthorized')
        console.log(e)
    }
}