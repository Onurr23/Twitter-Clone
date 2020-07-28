const route = require('express').Router();
const userController = require('../Controllers/UserController');


route.post('/signup',userController.createUser);

route.post('/signin',userController.signUserIn);

route.get('/',userController.getUsers);


module.exports = route;