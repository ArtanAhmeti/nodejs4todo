let express = require('express');
let router = express.Router();
let UserController = require('../app/controllers/UserController');


// Signup
router.post('/register', function(req, res, next) {
    UserController.register(req, res);
});

// Login
router.post('/login', function(req, res, next) {
    UserController.login(req, res);
});

module.exports = router;
