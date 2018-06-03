const jwt = require('jsonwebtoken');
const message = require('../utils');
const env = require('../utils');

/*******************************************************
 * Controller: AuthenticationController
 *
 * Main controller that is responsible to verify if
 * user is authenticated
 * *****************************************************/

class AuthenticationController {

    // Verify if user is logged in
    verifyLogin(request, response, next) {
        // Get token from any request or from header
        const token = request.method === 'POSt' || request.body.token || request.query.token || request.headers['access-token'];
        if (!token) return response.status(401).json(message.send('Token not found', false))

        jwt.verify(token, env.get('JWT_SECRET'), function (err, decoded) {
            // Delete password we don't want to send it to user
            if (!decoded) return response.status(401).json(message.send('Unauthroizrd user', false))
            request.user = decoded;
            return next();
        });

    }
}

module.exports = new AuthenticationController();