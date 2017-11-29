'use strict'
var jwt = require ('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.checkToken = function (req,res,next){
	if (!req.headers.token){
		return res.status(403).send({message: 'requiere autorizacion'})
	}else
		var token = req.headers.token.replace(/['"]+/g, '');
		console.log(token);
		try{
			var payload = jwt.decode(token, secret);
			if (payload.exp <= moment().unix()) {
				return res.status(401).send({message: 'token expirado'})
			}
		}catch(ex){
			console.log(ex);
			return res.status(401).send({message: 'token no valido'})
		}

	req.user = payload;
	next();
};