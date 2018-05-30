var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
var relationship = require("mongoose-relationship")

let userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    cpf: {type: String, required: true, unique: true},
    gender: {type: String, enum: ['male', 'female', 'other'], require: true},
    level: {type: String, enum: ['admin', 'reader', 'salesman'], require: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    password: {type: String, required: true},
    status: {type: Boolean, default: false, require: false},
    block: {type: Boolean, default: false, require: false},
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"employees"},
    stores: [{type: mongoose.Schema.ObjectId, required: false}]
})

userSchema.pre('save', function(next) {
    let user = this

    if(this.isNew) {
        user.block = false
        user.status = false
    }

    if(this.isModified('password'))
        user.status = true

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
    })
}

userSchema.plugin(relationship, { relationshipPathName:['solution'] })
export const UserSchema = mongoose.model('User', userSchema)