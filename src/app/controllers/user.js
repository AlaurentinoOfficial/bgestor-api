import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { UserSchema } from "../models/user"
import { SolutionSchema } from "../models/solution"
import { Strings } from "../config/strings"

exports.login = (req, res) => {
    UserSchema.findOne({email: req.body.email}, (err, user) => {
        if(err || !user)
            return res.json({status: false, value: Strings.INVALID_EMAIL})

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch && !err)
            {
                let token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60) * 3,
                                data: user._id
                            }, Server.get('crypt_key'))
    
                return res.json({status: true, value: {token: token}})
            }
            else
                return res.json({status: false, value: Strings.INVALID_PASSWORD})
        })
    })
}

exports.info = (req, res) => {
    var user = res.locals.user
    user.password = ""
    user.token = ""

    delete user.password
    delete user.token

    res.json(user)
}

exports.getById = (req, res) => {
    UserSchema.findOne({solution: res.locals.user.solution, _id: req.params.id}, (err, user) => {
        if(err || !user)
            return {status: false, value: Strings.INVALID_USER}
        
        var shadow = user._doc
        delete shadow.password
                
        res.json({status: true, value: Strings.SUCCEFULY, user: shadow})
    })
}

exports.getAllUsers = (req, res) => {
    UserSchema.find({solution: res.locals.user.solution}, (err, users) => {
        if(err || !users)
            return {status: false, value: Strings.INVALID_USER}
        
        users.forEach(u => {
            u = u._doc
            delete u.password
        })
        
        res.json({status: true, value: Strings.SUCCEFULY, users: users})
    })
}

exports.addNewUser = (req, res) => {
    req.body.solution = res.locals.user.solution
    delete req.body.status
    delete req.body.block

    UserSchema.create(req.body, (err, user) => {
        if(err || !user)
            return res.json({status: false, value: err.code == 11000 ? Strings.ALREADY_CREATED : Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}

exports.updateById = (req, res) => {
    delete req.body.solution
    delete req.body.permissions
    delete req.body.status
    delete req.body.block

    UserSchema.findOneAndUpdate({solution: res.locals.user.solution, _id: req.params.id}, req.body, (err, user) => {
        if(err || !user)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}