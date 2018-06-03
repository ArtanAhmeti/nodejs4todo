
const bcrypt = require('bcrypt');
const userModel = require('../models/User');
const Joi = require('../validation');
const message = require('../utils');
const jwt = require('jsonwebtoken');

const env = require('../utils');

/*******************************************************
 * Controller: UserController
 *
 * Main controller that runs operations for User
 * such as register user and login
 * *****************************************************/

class UserController  {

    // Regist new user
    register(request, response) {

        let data = request.body;
        const {error, value} =  Joi.validate(data, Joi.userRegistration());

        //If conditions aren't valid return error details
        if (error) return response.status(404).json(error.details);

        // Proceed to create user
        let user = new userModel(value);
        user.save(function (err) {
            if (err) return response.status(404).json(message.send('Registration failed, something went wrong!', false));
            return response.status(200).json(message.send('User registered successfully!', true));
        });

    };

    /*
     * User authentication generates a valid token and returns it to user
     */
    login (request, response) {

        const data = request.body;
        const {error, value} =  Joi.validate(data, Joi.userLogin());

        //If input for login is not valid return error details
        if (error) return response.status(404).json(error.details);

        // Continue to login procedure
        userModel.findOne({email: value.email}).select('+password').exec(function(error, user) {

            // If user not found or any error return message to notify user
            if (error || !user) {
                return response.status(404).json(message.send("User couldn't be found!", false));
            }

            // Compare plain text with hash in db
            bcrypt.compare(data.password, user.password, function (err, result) {
                let res = message.send('Something went wrong', false);
                // If password is valid with the password in db create token and return it
                if (result) {
                    let token = jwt.sign({ data: user}, env.get('JWT_SECRET'), {expiresIn: '1d'});
                    res = message.send(token, true);
                }
                return response.status(200).json(res);
            });
        });
    };
}

module.exports = new UserController();
