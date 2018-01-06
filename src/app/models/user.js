
var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
var relationship = require("mongoose-relationship")

let userSchema = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"user"},
    email: {type: String, required: true, lowercase: true, unique: true},
    password: {type: String, required: true},
    status: {type: Boolean, default: false, require: false}
})

userSchema.pre('save', function(next) {
    let user = this

    if(this.isNew)
        user.status = false

    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if(err)
                return next(err)

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err)
                    return next(err)
                
                user.password = hash
                next()
            });
        });
    }
    else
        return next()
});

userSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMath) => {
        if(err)
            return cb(err)

        cb(null, isMath)
    });
};
userSchema.plugin(relationship, { relationshipPathName:'solution' })
export const UserSchema = mongoose.model('User', userSchema)