'use strict';

var express = require ('express')
var UserController = require ('../controllers/user');
var mdAuth = require ('../middlewares/authenticate');
var multipart = require('connect-multiparty');

var api = express.Router();
var mdUpload = multipart({uploadDir: './uploads/users'});

api.get('/user-pruebas',mdAuth.checkToken, UserController.pruebas);
api.post('/users', UserController.saveUser);
api.post('/users/login', UserController.loginUser);
api.put('/users/:id', mdAuth.checkToken,UserController.updateUser);
api.post('/users/:id/upload', [mdAuth.checkToken,mdUpload], UserController.uploadAvatar);
api.get('/images/:id', UserController.getImageFile);
api.get('/keepers', UserController.getKeepers); 


module.exports = api;