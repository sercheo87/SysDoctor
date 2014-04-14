'use strict';
var db = require('orm').db;

/**
* Add Event
*/
exports.addEvent=function(req, res) {
	console.log([req.body], ['-->>>>add Event']);
	console.log('new Date(req.body.eventstart)',new Date(req.body.eventstart))
	db.models.tbevents.create([{
		id_patient: 	req.body.idPatient,
		eventstart: 	new Date(req.body.eventstart),
		level: 				req.body.level,
		observation: 	req.body.observation,
		confirmed: 		false
	}],function(err,data){
		if(err){
			console.log([err], ['Error in Event Added!']);
			res.send({ 'success': false, 'msg' : 'Error en registro de la cita' });
		}else{
			console.log([data], ['Patient Added!']);
			res.send({ 'success': true, 'msg' : 'Cita Registrada'});
		}
	});
};

/**
* Get All Events
*/
exports.getAllEvents=function(req, res) {
	console.log([req.params], ['-->>>>get All Events']);

	var events={
		'success':'1',
		'result':[]
	};

	db.driver.execQuery('SELECT a.*, b.last_name, b.name, b.phone, b.identification FROM tbevents a,tbpatient b WHERE b.id_patient=a.id_patient', function (err, data) {
		res.send({ 'success': true, 'msg' : 'Listado de Eventos','data':data});
	});
};