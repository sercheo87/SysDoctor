'use strict';
var db = require('orm').db;
var express = require('express');

/**
* Verificar la existencia del usuario
*/
exports.GetUser=function(req, res) {
	var username = req.param("username");
	var password = req.param("password");

	db.models.tbusers.find({ login: username, pass:password },function(err, users){
		if(err){
			console.log(err);
			res.send(500, {error: "Error de Conexion con la Base de Datos"});
		}

		if(users.length>0){
			express.session.authenticate='true';
			req.session.authenticate='true';
			res.send(users);
		}
		else{
			res.send(400, {error: "No se ha encontrado el usuario"});
		}
	});
};

/**
* Obtener el listado de todos los usuarios
*/
exports.GetAllUsers=function(req, res) {
	db.models.tbusers.find(function(err, users){
		if(err){
			console.log(err);
			res.send(500, {error: "Error de Conexion con la Base de Datos"});
		}

		res.send(users);
	});
};