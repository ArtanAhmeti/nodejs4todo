
const Joi = require('../validation');
const message = require('../utils');
const todoModel = require('../models/Todo');

/*******************************************************
 * Controller: TodoController
 *
 * Main controller that runs CRUD operations for todos
 * *****************************************************/
class TodoController {

    // Create todo for logged in user
    createTodo(request, response) {

        const data = request.body;
        //Validate inputs for new todo
        const {error, value} = Joi.validate({title: data.title, user_id: request.user.data._id, completed: data.completed}, Joi.newTodo());

        if (error) return response.send(error.details);

        let todo = new todoModel(value);
        todo.save(function (err) {
            if (err) return response.status(404).json(message.send('Failed to create todo, something went wrong!', false));
            return response.status(200).json(todo);
        });

    };

    // Edit todo single todo
    editTodo(request, response) {

        const params = request.params;
        const data = request.body;

        todoModel.findOneAndUpdate({_id: params.id, user_id: request.user.data._id}, {title: data.title, completed: data.completed}, {new: true}, (err, todo) => {

            if (err || !todo) return response.status(404).json(message.send("Todo not found!", false));
            return response.status(200).json(todo);
        });

    };

    // Complete todo
    completeTodo(request, response) {

        const params = request.params;
        const data = request.body;

        // Validate inputs for complete todo
        const {error, value} = Joi.validate(data, Joi.completeTodo());
        if (error) return response.send(error.details);

        // Find and update todo with complete as new value
        todoModel.findOneAndUpdate({_id: params.id, user_id: request.user.data._id}, {completed: data.completed}, {new: true}, (err, todo) => {
            if (err || !todo) return response.send(message.send("Todo not found!", false));

            return response.status(200).json(message.send('Todo updated successfully', true));
        });

    };

    // Get single todo
    todo(request, response) {

        const data = request.params;

        // Find todo by id
        todoModel.findOne({_id: data.id, user_id: request.user.data._id}).exec(function (error, todo) {
            if (error || !todo) {
                return response.status(404).json(message.send("Not found!", false));
            }
            return response.status(200).json(todo);
        });

    };

    // Get current user todos
    todos(request, response) {

        // Find all todos for authenticated user and return if any, else return "All clear message"
        todoModel.find({user_id: request.user.data._id}).exec(function (error, todo) {
            if (error || !todo) {
                return response.status(200).json(message.send("All clear!", false));
            }
            return response.status(200).json(todo);
        });

    };

    // Delete single todo
    deleteTodo(request, response) {

        const data = request.params;

        // Delete todo based in logged in user
        todoModel.deleteOne({user_id: request.user.data._id, _id: data.id}).exec(function(error, todo) {

            if (error || !todo) {
                return response.status(404).json(message.send("Todo not found!", false));
            }
            return response.status(200).json(message.send('Todo deleted successfully'));
        });

    };

    // Simple todo stats
    todoStats(request, response) {
        // Find all todos for authenticated user and return if any, else return "All clear message"
        todoModel.find({user_id: request.user.data._id}).exec(function (error, todo) {
            if (error || !todo) {
                return response.send(message.send("All clear!", false));
            }
            let stats = {completed: 0, notCompleted: 0, total: 0};
            for (let i = 0; i < todo.length; i++) {
                if (todo[i].completed) {
                    stats.completed++
                } else {
                    stats.notCompleted++
                }
            }
            stats.total = todo.length
            return response.status(200).json(stats);
        });

    };
}

module.exports = new TodoController();
