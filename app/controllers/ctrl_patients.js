var db = require('orm').db;

exports.add = function(req, res){
	res.render('patients/add', {
		title: 'Registro de Pacientes'
	});
};

exports.list = function(req, res){
	res.render('patients/list', {
		title: 'Listado de Pacientes'
	});
};

exports.detail = function(req, res){
	var dataCollection={};
	var idPatient=req.params.identification;

	res.render('patients/detail', {
		title: 'Informacion del Paciente',
		dataId: idPatient
	});

};