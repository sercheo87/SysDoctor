'use strict';
var db = require('orm').db;

/**
* Add Patient
*/
exports.addPatient=function(req, res) {
	console.log([req.body], ['-->>>>add user']);

	db.models.tbpatient.count({ identification: req.body.identification }, function (err, count) {
		if(count==0){
			//Usuario no encontrado se registrara
			db.models.tbpatient.create([{
				address: req.body.address,
				email: req.body.email,
				id_city: 1,
				id_civil_status: 1,
				id_education: 1,
				id_profession: 1,
				identification: req.body.identification,
				last_name: req.body.lastname,
				name: req.body.name,
				ocupation: req.body.ocupation,
				phone: req.body.phone
			}],function(err,data){
				if(err){
					console.log([err], ['Error in Patient Added!']);
					res.send({ 'success': false });
				}else{
					console.log([data], ['Patient Added!']);
					res.send({ 'success': true , 'msg' : 'Usuario registrado'});
				}
			});
		}else
		{
			//Usuario encontrado
			res.send({ 'success': false , 'msg' : 'El usuario ya se encuentra registrado'});
		}
	});

};
