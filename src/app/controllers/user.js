import * as jwt from "jsonwebtoken";

import { Server } from "../../server";
import { UserSchema } from "../models/user";
import { SolutionSchema, Solution } from "../models/solution";

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

                var token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60) * 3,
                                data: user._id
                            }, Server.get('crypt_key'))
                var json = {solution: user.solution, solutionName: user.fullName, email: user.email, token: 'CRM ' + token}

                res.json(json)
            }
            else
                res.json(GetCode('INVALID_PASSWORD'))
        });
    });
}