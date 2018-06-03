let express = require('express');
let router = express.Router();
const AuthController = require('../app/controllers/AuthenticationController')
const TodoController = require('../app/controllers/TodoController')

// Get all todos
router.get('/', function(req, res, next) {
    TodoController.todos(req, res);
});

//Create todo
router.post('/create', function(req, res, next) {
    TodoController.createTodo(req, res);
});

// todo stats
router.get('/stats', function(req, res, next) {
    TodoController.todoStats(req, res);
});

//Get single todo
router.get('/:id', function(req, res, next) {
    TodoController.todo(req, res);
});

// Edit todo
router.patch('/edit/:id', function(req, res, next) {
    TodoController.editTodo(req, res);
});

//Complete todo
router.patch('/complete/:id', function(req, res, next) {
    TodoController.completeTodo(req, res);
});

//Delete todo
router.delete('/delete/:id', function(req, res, next) {
    TodoController.deleteTodo(req, res);
});



module.exports = router;
