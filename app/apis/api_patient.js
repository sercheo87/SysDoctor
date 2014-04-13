'use strict';
var db = require('orm').db;

/**
* Add Patient
*/
exports.addPatient=function(req, res) {
	console.log([req.body], ['-->>>>add patient']);

	db.models.tbpatient.count({ identification: req.body.identification }, function (err, count) {
		if(count==0){
			//Usuario no encontrado se registrara
			db.models.tbpatient.create([{
				address 				: req.body.address,
				email 					: req.body.email,
				id_city 				: req.body.city,
				id_civil_status : req.body.id_civil_status,
				id_education 		: 1,
				id_profession 	: req.body.id_profession,
				identification 	: req.body.identification,
				last_name 			: req.body.lastname,
				name 						: req.body.name,
				ocupation 			: req.body.ocupation,
				phone 					: req.body.phone,
				birthday 				: req.body.birthday,
				sex 						: req.body.sex,
				emergency_phone : req.body.emergency_phone,
				emergency_name 	: req.body.emergency_name,
				emergency_kin 	: req.body.emergency_kin,
				birthplace 			: req.body.birthplace
			}],function(err,data){
				if(err){
					console.log([err], ['Error in Patient Added!']);
					res.send({ 'success': false, 'msg' : 'Error en registro del paciente' });
				}else{
					console.log([data], ['Patient Added!']);
					res.send({ 'success': true, 'msg' : 'Usuario registrado'});
				}
			});
		}else
		{
			//Usuario encontrado
			res.send({ 'success': false, 'msg' : 'El usuario ya se encuentra registrado'});
		}
	});

};

/**
* Get Patient
*/
exports.getPatient=function(req, res) {
	console.log([req.params], ['-->>>>get patient']);

	db.models.tbpatient.find({ identification: req.params.identification }, function (err, people) {
		console.log(people);
		if(err){
			console.log([err], ['Error in Getting Patient!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo el paciente' });
		}else{
			console.log([people], ['Getting Patient!']);
			res.send({ 'success': true, 'data' : people });
		}
	});

};


/**
* Get List Patient
*/
exports.getListPatient=function(req, res) {
	console.log([req.params], ['-->>>>get list patient']);

	db.models.tbpatient.find(function (err, people) {
		console.log(people);
		if(err){
			console.log([err], ['Error in Getting Patients!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo el paciente' });
		}else{
			console.log([people], ['Getting Patients!']);
			res.send({ 'success': true, 'data' : people });
		}
	});

};