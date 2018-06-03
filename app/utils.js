'use strict';

require('dotenv').config();
let env = require('env-var');

// Get env variables
const get = (proc) => {
    try {
        return env.get(proc).asString();
    }
    catch (err) {
        console.log(err)
        throw new Error('Either process doesnt exists or forgot to add process as parameter!')
    }
};

// Simple formatter for messages when we return data to client
const message = (message, success) => {
    return {message: message, success: success}
};

module.exports.get = get;
module.exports.send = message;
