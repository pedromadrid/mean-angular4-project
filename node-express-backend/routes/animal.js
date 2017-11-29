'use strict';

var express = require ('express')
var AnimalController = require ('../controllers/animal');
var mdAuth = require ('../middlewares/authenticate');
var mdAdmin = require ('../middlewares/is-admin');
var multipart = require('connect-multiparty');

var api = express.Router();
var mdUpload = multipart({uploadDir: './uploads/animals'});


api.get('/animal-pruebas',mdAuth.checkToken, AnimalController.pruebas);
api.post('/animals', [mdAuth.checkToken,mdAdmin.isAdmin], AnimalController.saveAnimal);
api.get('/animals', AnimalController.getAllAnimals);
api.get('/animals/:id', AnimalController.getAnimal);
api.put('/animals/:id', [mdAuth.checkToken,mdAdmin.isAdmin], AnimalController.updateAnimal);
api.post('/animals/:id/upload', [mdAuth.checkToken, mdAdmin.isAdmin, mdUpload], AnimalController.uploadImage);
api.get('/animals/:id/images', AnimalController.getImageFile);
api.delete('/animals/:id',[mdAuth.checkToken,mdAdmin.isAdmin], AnimalController.deleteAnimal);

module.exports = api;