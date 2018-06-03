let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/*
 * Todo model
 */
let todoSchema = new Schema({
    title:       String,
    user_id:     String,
    created_at:  { type: Date, default: Date.now },
    updated_at:  { type: Date, default: Date.now },
    completed:   { type: Boolean, default: false}
});

let todoModel = mongoose.model('todos', todoSchema);

module.exports = todoModel