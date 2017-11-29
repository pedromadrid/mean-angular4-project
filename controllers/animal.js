'use strict';

//modulos
var bcrypt = require ('bcrypt-nodejs');
var fs = require('fs');

//modelos
var User = require('../models/user');
var Animal = require('../models/animal');

//servicios
var jwt = require ('../services/jwt');

//acciones

function pruebas(req,res){
	res.status(200).send({
		message: 'Probando el controlador de animales, accion pruebas',
		user: req.user
	})
}

function saveAnimal(req,res){
	var animal = new Animal();

	var params = req.body;

	if (params.name){
		animal.name=params.name;
		animal.description = params.description;
		animal.year = params.year;
		animal.image=null;
		animal.user=req.user.sub;
		animal.save((err, animalStored) =>{
			if (err){
				res.status(500).send({message: 'error en el servidor al guardar'});
			}else{
				if (!animalStored){
					res.status(400).send({message: 'No se pudo guardar el animal'});
				}else{
					res.status(200).send({animal: animalStored});
				}
			}
		})
	}else{
		res.status(403).send({message: 'faltan datos'});
	}
}

function getAllAnimals(req,res){
	Animal.find({}).populate({path: 'user'}).exec((err, animals) =>{
		if (err){
			res.status(500).send({message: 'error en el servidor'});
		}else
		if(!animals){
			res.status(404).send({message: 'No hay animales'});
		}else{
			res.status(200).send({animals});
		}
	})
}

function getAnimal(req,res){
	var animalId = req.params.id;

	Animal.findById(animalId).populate({path: 'user'}).exec((err, animalF) => {
		if(err){
			res.status(500).send({message: 'error en el servidor'});
		}else{
			if (!animalF){
				res.status(404).send({message: 'No encontrado'});
			}else{
				res.status(200).send({animal: animalF})
			}
		}
	})
}

function updateAnimal(req, res){
	var animalId = req.params.id;
	var update = req.body;

	Animal.findByIdAndUpdate(animalId, update,{new:true}, (err,animalUpdated) => {
		if (err){
			res.status(500).send({message: 'error en el servidor'})
		} else{
			if (!animalUpdated){
				res.status(400).send({message: 'animal no encontrado'})
			}else{
				res.status(201).send({message: 'animal actualizado', animal: animalUpdated})
			}
		}
	})
}

function uploadImage(req,res){
	var animalId = req.params.id;
	var fileName= 'No subido..';

	console.log(req.files);

	if (req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('/');
		var fileName = fileSplit[2];

		
 
		Animal.findByIdAndUpdate(animalId,{image: fileName},{new:true},(err, animalUpdated)=>{
			if (err){
				res.status(500).send({message: 'error en el server actualizando el animal'})
			}else{
				if(!animalUpdated){
					res.status(500).send({message: 'animal no actualizado'})
				}else{
					console.log(animalUpdated);
					res.status(200).send({animal: animalUpdated})
				}
			}
		})
			
	}
	else{
		res.status(400).send({message:'no se cargo archivo'});
	}
}

function getImageFile(req,res){
	var imageFile = req.params.id;
	var pathFile = './uploads/animals/'+imageFile;
	console.log(fs.existsSync(pathFile));
	res.status(200).sendfile(pathFile);
}

function deleteAnimal(req,res){
	var animalId = req.params.id;

	Animal.findByIdAndRemove(animalId, (err,animalRemoved) =>{
		if (err){
			res.status(500).send({message: 'error en el server al eliminar animal'});
		}else{
			if(!animalRemoved){
				res.status(400).send({message: 'no se pudo eliminar animal'});
			}else{
				res.status(203).send({message: 'animal eliminado', animal: animalRemoved});
			}
		}
	})
}


module.exports = {
	pruebas, saveAnimal, getAllAnimals, getAnimal, updateAnimal, uploadImage, getImageFile, deleteAnimal
};