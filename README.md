## TODO application - NodeJS & MongoDB

### Description

Basic CRUD application with MongoDB and NodeJS.

### Requirements
- NodeJS
- MongoDB (if you want to connect to your local db otherwise its using MongoDB Atlas)

### How to run
- After cloning Open terminal and navigate to root of application
- From terminal in root folder of application run <b>npm install</b>
- After installation of required libraries, from terminal run <b>npm run dev</b>
- In browser or using any rest api client now you can navigate to different routes

### Routes
- Base path: <b>http://localhost:8000/api</b>

- Register `/users/register` POST

- Login `/users/login` POST

- Create todo `/todos/new` POST

- Get all todos:  `/todos` GET

- Get single todo: `/todos/{id}` GET

- Edit todo: `/todos/edit/{id}` PATCH

- Mark as complete todo `/todos/complete/{id}` PATCH

- Delete todo `/todos/delete/{id}` DELETE

<i>Note: You can change port and db configurations in .env file</i>

You can find front end of this app [here](https://github.com/ArtanAhmeti/react4todo "Front end repo")


