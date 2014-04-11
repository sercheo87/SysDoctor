'use strict';
var db = require('orm').db;

/**
* Add Medical Appointments
*/
exports.addMedicalAppointments=function(req, res) {
	console.log([req.params], ['-->>>>add medical appointments record']);
	db.models.tbmedicalappointments.create([{
		id_medical: 			req.params.idMedical,
		date_reg: 				new Date(),
		rweight: 					req.body.rweight,
		rsize: 						req.body.rsize,
		pulse: 						req.body.pulse,
		blood_pressure: 	req.body.blood_pressure,
		reason: 					req.body.reason,
		observation: 			req.body.observation
	}],function(err,data){
		if(err){
			console.log([err], ['Error in Medical Appointments Added!']);
			res.send({ 'success': false, 'msg' : 'Error en registro de cita medica' });
		}else{
			console.log([data], ['Medical Appointments Added!']);
			res.send({ 'success': true, 'msg' : 'Registro Medico registrado'});
		}
	});
};


/**
* Get Medical Appointments
*/
exports.getMedicalAppointments=function(req, res) {
	console.log([req.params], ['-->>>>get medical appointments record']);

	db.models.tbmedicalappointments.find({ id_appointments: req.params.idAppointments }, function (err, record) {
		console.log(record);
		if(err){
			console.log([err], ['Error in Getting Medical Record!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo registro medica' });
		}else{
			console.log([record], ['Getting Medical Record!']);
			res.send({ 'success': true, 'data' : record });
		}
	});

};


/**
* Get Medical Appointments
*/
exports.getListMedicalAppointments=function(req, res) {
	console.log([req.params], ['-->>>>get list medical Appointments']);

	db.models.tbmedicalappointments.find({ id_medical: req.params.idMedical }).order('-id_appointments').all( function (err, record) {
		console.log(record);
		if(err){
			console.log([err], ['Error in Getting Medical Appointments!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo registro medica' });
		}else{
			console.log([record], ['Getting Medical Appointments!']);
			res.send({ 'success': true, 'data' : record });
		}
	});

};