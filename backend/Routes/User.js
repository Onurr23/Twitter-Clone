const route = require('express').Router();
const userController = require('../Controllers/UserController');


route.post('/signup',userController.createUser);

route.post('/signin',userController.signUserIn);

route.post('/:id',userController.updateUser);

route.get('/user/:id',userController.getUser);

route.post('/otheruser/:id',userController.updateProfile);

route.post('/user/:id',userController.updateUserTweets);


module.exports = route;