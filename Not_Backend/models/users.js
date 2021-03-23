const mongoose = require('mongoose');
const { model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');



SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    } ,
    password : {
        type : String,
        required : true,
        
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    questions : [{
        type : Schema.Types.ObjectId,
        required : true,
        ref : "Question"
    }],

}, { timestamps: true } );






UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function(candidatePassword,hash) {
    const match = await bcrypt.compare(candidatePassword , hash);
    return match
};


UserSchema.plugin(uniqueValidator);
const UserModel = model('User' , UserSchema);
module.exports = UserModel;