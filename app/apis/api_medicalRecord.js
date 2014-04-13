'use strict';
var db = require('orm').db;

/**
* Add Medical Record
*/
exports.addMedicalRecord=function(req, res) {
	console.log([req.params], ['-->>>>add medical record']);
	
	db.models.tbmedicalrecord.exists({ id_patient: req.params.idPatient}, function (err, exists) {

		if(err){
			console.log([err], ['Error in Getting Medical Record!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo registro medico' });
		}

		if(exists){
			db.models.tbmedicalrecord.get(1,{ id_patient: req.params.idPatient }, function (err, record) {

				console.log('Registro obtenido:',record);
				if(err){
					console.log([err], ['Error in Getting Medical Record!']);
					res.send({ 'success': false, 'msg' : 'Error obteniendo registro medico' });
				}

				record.habit 				=	req.body.habit;
				record.antecedent 	=	req.body.antecedent;
				record.alergy 			=	req.body.alergy;
				record.date_reg 		=	new Date();
				record.observation 	= req.body.observation;
				record.blood_type 	=	req.body.bloodType;

				record.save(function(err){
					if(err){
						console.log([err], ['Error in Getting Medical Record!']);
						res.send({ 'success': false, 'msg' : 'Error obteniendo registro medico' });
					}else{
						console.log([record], ['Updating Medical Record!']);
						res.send({ 'success': true, 'data' : record , 'msg' : 'Registro Medico Actualizado' });
					}
				});
			});

		}else{
			db.models.tbmedicalrecord.create([{
				id_patient: 	req.params.idPatient,
				habit: 				req.body.habit,
				antecedent: 	req.body.antecedent,
				alergy: 			req.body.alergy,
				date_reg: 		new Date(),
				observation: 	req.body.observation,
				blood_type: 	req.body.bloodType
			}],function(err,data){
				if(err){
					console.log([err], ['Error in Medical Record Added!']);
					res.send({ 'success': false, 'msg' : 'Error en registro medico' });
				}else{
					console.log([data], ['Medical Record Added!']);
					res.send({ 'success': true, 'msg' : 'Registro Medico registrado'});
				}
			});
		}
	});
};

/**
* Get Medical Record
*/
exports.getMedicalRecord=function(req, res) {
	console.log([req.params], ['-->>>>get medical record']);

	db.models.tbmedicalrecord.find({ id_medical: req.params.idMedical }, function (err, record) {
		console.log(record);
		if(err){
			console.log([err], ['Error in Getting Medical Record!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo registro medico' });
		}else{
			console.log([record], ['Getting Medical Record!']);
			res.send({ 'success': true, 'data' : record });
		}
	});

};


/**
* Get Medical Record
*/
exports.getListMedicalRecord=function(req, res) {
	console.log([req.params], ['-->>>>get list medical record']);

	db.models.tbmedicalrecord.find({ id_patient: req.params.idPatient }, function (err, record) {
		console.log(record);
		if(err){
			console.log([err], ['Error in Getting Medical Record!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo registro medico' });
		}else{
			console.log([record], ['Getting Medical Record!']);
			res.send({ 'success': true, 'data' : record });
		}
	});

};