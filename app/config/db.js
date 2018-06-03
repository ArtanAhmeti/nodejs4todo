
const mongoose  = require('mongoose');
const env = require('../utils');

/*
 *  Connect to database using mongoose and return mongoose object
 */
const db = () => {
    mongoose.connect(env.get('DB_CONNECTION'));
    return mongoose;
};

module.exports = db;