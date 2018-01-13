"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var relationship = require("mongoose-relationship");

var userSchema = new mongoose.Schema({
    solution: { type: mongoose.Schema.ObjectId, ref: "Solution", childPath: "user" },
    name: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['male', 'female', 'other'], require: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    level: { type: String, enum: ['admin', 'saler'], default: 'saler', require: true },
    stores: [{ type: mongoose.Schema.ObjectId, ref: "Store", required: false }],
    status: { type: Boolean, default: false, require: false },
    block: { type: Boolean, default: false, require: false },
    token: { type: String, require: false }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (this.isNew) {
        user.block = false;
        user.status = false;
    }

    if (this.isModified('password')) user.status = true;

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

userSchema.methods.compareLevel = function (level) {
    var that = 0;

    that = undefined.level == 'admin' ? 1 : 0;
    level = level == 'admin' ? 1 : 0;

    return that >= level;
};

userSchema.plugin(relationship, { relationshipPathName: 'solution' });
var UserSchema = exports.UserSchema = mongoose.model('User', userSchema);