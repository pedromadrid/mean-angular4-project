'use strict';

//modulos
var bcrypt = require ('bcrypt-nodejs');
var fs = require('fs');

//modelos
var User = require('../models/user');

//servicios
var jwt = require ('../services/jwt');
 
//acciones

function pruebas(req,res){
	res.status(200).send({
		message: 'Probando el controlador de usuarios, accion pruebas'
	})
}

function saveUser(req,res){
	var user = new User();

	var params = req.body;
	console.log(params);


	if (params.password && params.name && params.surname && params.email){
		user.name = params.name;
		user.surname=params.surname;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;

		User.findOne({email: user.email.toLowerCase()}, (err,usr) => {
			if (err){
				console.log (err);
				res.status(500).send({message: 'error al comprobar el usuario'});
			}else{
				if(!usr){
					bcrypt.hash(params.password, null, null, function(err, hash){
						user.password=hash;
						user.save((err,userStored)=>{
							if(err){
								res.status(500).send({message: 'Error al guardar'})
							}else{
								if(!userStored){
									res.status(400).send('No se guardo')
								}else{
									res.status(200).send({user: userStored})
								}
							}
						})
					})
				}
				else{
					res.status(200).send({message: 'Ya existe un usuario con este mail'});
				}
			}
		} )

		
	}else{
		res.status(403).send({message: 'faltaron datos'})
	}
}

function loginUser(req, res){
	//var user = new User();
	var params = req.body;
	//var email = params.email;

	User.findOne({email: params.email.toLowerCase()}, (err,usr) => {
			if (err){
				res.status(500).send({message: 'error al comprobar el usuario'});
			}else{
				if(!usr){
					res.status(400).send({message: 'email no registrado'});
				} else{
					bcrypt.compare(params.password, usr.password, (error,check) => {
						if(error){
							res.status(500).send({message: 'Contraseña inválida'});
						}else{
							if (check) {

								res.status(200).send({
									user:usr,
									token: jwt.createToken(usr)
								});
							}else{
								res.status(400).send({message: 'Contraseña inválida'});
							}
						}						
						
					})
					
				}
			}
		})
}

function updateUser(req, res){

	var userId = req.params.id;
	var updateData = req.body;
	delete updateData['password'];


	if (userId != req.user.sub){
		res.status(403).send({message: 'Sin permisos para actualizar usuario'})
	}else {
		User.findByIdAndUpdate(userId,updateData,{new:true},(err, userUpdated)=>{
			if (err){
				res.status(500).send({message: 'error en el server actualizando el usuario'})
			}else{
				if(!userUpdated){
					res.status(500).send({message: 'Usuario no actualizado'})
				}else{
					res.status(200).send({message: 'usuario actualizado', user: userUpdated})
				}
			}
		})
		
	}
}

function uploadAvatar(req,res){
	var userId = req.params.id;
	var fileName= 'No subido..';
	console.log(req.files);
	
	if (req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('/');
		var fileName = fileSplit[2];

		if (userId != req.user.sub){
			res.status(403).send({message: 'Sin permisos para actualizar usuario'})
		}else {
			User.findByIdAndUpdate(userId,{image: fileName},{new:true},(err, userUpdated)=>{
				if (err){
					res.status(500).send({message: 'error en el server actualizando el usuario'})
				}else{
					if(!userUpdated){
						res.status(500).send({message: 'Usuario no actualizado'})
					}else{
						res.status(200).send({message: 'usuario actualizado', user: userUpdated})
					}
				}
			})
			
		}
	}
	else{
		res.status(400).send({message:'no se cargo archivo'});
	}
}

function getImageFile(req,res){
	var imageFile = req.params.id;
	var pathFile = './uploads/users/'+imageFile;
	console.log(fs.existsSync(pathFile));
	res.status(200).sendfile(pathFile);
}

function getKeepers(req, res){
	User.find({role:'ROLE_ADMIN'}).exec((err, users) => {
		if (err){
			res.status(500).send({message: 'Error en la petición'});
		}else {
			if (!users){
				res.status(404).send({message: 'No se encontraron cuidadores'});
			}else{
				res.status(200).send({users});
			}
		}
			
	})
}

module.exports = {
	pruebas, saveUser, loginUser, updateUser, uploadAvatar, getImageFile, getKeepers
};