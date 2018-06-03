const  express = require('express');
const  todosRoutes = require('./routes/todos');
const  bodyParser = require('body-parser');
const  usersRouter = require('./routes/users');
const  AuthController = require('./app/controllers/AuthenticationController');
const  env = require('./app/utils');
const  app = express();
const  cors = require('cors')
// const  logger = require('morgan');

// app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User routes
app.use('/api/user', usersRouter);

// Auth middleware
app.use('/', AuthController.verifyLogin);
// Todos routes
app.use('/api/todos', todosRoutes);

// Comment this line for production
 app.listen(env.get('API_PORT'), () => console.log('App started in port ' + env.get('API_PORT')));

// Uncomment this line for production
// module.exports = app