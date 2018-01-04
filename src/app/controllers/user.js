import * as jwt from "jsonwebtoken";

import { Server } from "../../server";
import { UserSchema } from "../models/user";
import { SolutionSchema, Solution } from "../models/solution";

exports.login = (req, res) => {
    UserSchema.findOne({email: req.body.email}, (err, user) => {
        if(err) {
            console.log("Error at Login on UserController")
            res.json({success: false, message: 'Invalid email'})
            return;
        }

        if(!user)
            res.json({success: false, message: 'Invalid email'})
        else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(isMatch && !err)
                {
                    var sName = ""
                    SolutionSchema.findOne({_id: user.solution}, (err, solution) => {
                        if(err || !solution) return;
                        sName = solution.name;
                    });

                    var expiresTime = req.body.remember == true ? 160800 : 60000;

                    var token = jwt.sign({
                                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                    data: user._id
                                }, Server.get('crypt_key'));
                    var json = {solution: user.solution, solutionName: user.fullName, email: user.email, token: 'bearer ' + token};

                    res.json(json);
                }
                else
                    res.json({success: false, message: 'Invalid password'});
            });
        }
    });
}