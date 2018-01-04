var passport = require("passport")
import { Strategy, ExtractJwt } from "passport-jwt"
import { UserSchema, User } from "../models/user"

exports.Passport = (app) => {
    var opts = {}
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = app.get('crypt_key')
    passport.serializeUser((user, done) => {
        done(null, user)
    });
    passport.use(new Strategy(opts, (user, done) =>
    {
        UserSchema.findOne({_id: user.data}, (err, u) => {
            done(null, err ? false : u)
        });
    }));
};