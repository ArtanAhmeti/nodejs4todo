const Joi = require('joi');


/*
 * User registration validation
 */
Joi.userRegistration = () => {
    return {
        first_name: Joi.string().required(),
        last_name:  Joi.string().required(),
        email:      Joi.string().email().required(),
        password:   Joi.string().required().min(6),
    }
};

/*
 * User Login validation
 */
Joi.userLogin = () => {
    return {
        email:    Joi.string().email().required(),
        password: Joi.string().required(),
    };
};

/*
 * Create new todo validation
 */
Joi.newTodo = () => {
    return {
        title:     Joi.string().required(),
        completed: Joi.boolean().default(false),
        user_id:   Joi.string().required()
    }
};

/*
 * Modify todo validation
 */
Joi.editTodo = () => {
    return {
        id: Joi.string().required()
    }
};

/*
 * Complete todo validation
 */
Joi.completeTodo = () => {
    return {
        completed: Joi.boolean().required()
    }
};

module.exports  = Joi;
