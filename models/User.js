const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Middleware to hash password before saving to DB
UserSchema.pre('save', function(next) {
    const user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err);
            
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
