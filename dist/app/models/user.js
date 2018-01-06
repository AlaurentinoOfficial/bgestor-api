"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var relationship = require("mongoose-relationship");

var userSchema = new mongoose.Schema({
    solution: { type: mongoose.Schema.ObjectId, ref: "Solution", childPath: "user" },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else return next();
});

userSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMath) {
        if (err) return cb(err);

        cb(null, isMath);
    });
};
userSchema.plugin(relationship, { relationshipPathName: 'solution' });
var UserSchema = exports.UserSchema = mongoose.model('User', userSchema);