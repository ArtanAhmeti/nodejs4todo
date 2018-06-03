let mongoose = require('../config/db');
let Schema = mongoose().Schema;
let bcrypt = require('bcrypt');
const env = require('../utils');

/*
 * User model
 */
let userSchema = new Schema({
    first_name: String,
    last_name:  String,
    email:      String,
    password:   { type: String, select: false },
    created_at: { type: Date, default: Date.now },
});

/*
 * Hash password before we save in db
 */
userSchema.pre('save', function(next) {
    this.password =  bcrypt.hashSync(this.password, parseInt(env.get('BCRYPT_SALT_ROUNDS')));
    next();
});

let userModel = mongoose().model('users', userSchema);

module.exports = userModel;
