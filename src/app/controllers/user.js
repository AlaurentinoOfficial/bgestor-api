import * as jwt from "jsonwebtoken";

import { Server } from "../../server";
import { UserSchema } from "../models/user";
import { SolutionSchema, Solution } from "../models/solution";
import { Strings } from "../config/strings";

exports.login = (req, res) => {
    UserSchema.findOne({email: req.body.email}, (err, user) => {
        if(err || !user)
            return res.json({status: false, value: Strings.INVALID_EMAIL})

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch && !err)
            {
                var sName = ""
                SolutionSchema.findOne({_id: user.solution}, (err, solution) => {
                    if(err || !solution) return;
                    sName = solution.name;
                })

                let token = "CRM " + jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60) * 3,
                                data: user._id
                            }, Server.get('crypt_key'))
    
                return res.json({status: true, value: {token: token}})
            }
            else
                return res.json({status: false, value: Strings.INVALID_PASSWORD})
        });
    });
}

exports.info = (req, res) => {
    var user = res.locals.user
    user.password = ""
    user.token = ""

    delete user.password
    delete user.token

    res.json(user);
}

exports.password = (req, res) => {
    var body = {password: req.body.password}

    UserSchema.findOneAndUpdate({_id: res.locals.user._id}, body, (err, user) => {
        if(err || !user)
            return res.json({status: false, value: Strings.INVALID_USER})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}

exports.addNewUser = (req, res) => {
    var body = {
        solution: res.locals.user.solution,
        name: req.body.name,
        cpf: req.body.cpf,
        gender: req.body.gender,
        level: req.body.level,
        email: req.body.email,
        password: req.body.password
    }

    if(req.body.stores !== undefined)
        body.stores = req.body.stores

    UserSchema.create(body, (err, user) => {
        if(err || !user)
            return res.json({status: false, value: Strings.INVALID_USER})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}