var db = require('orm').db;

exports.add = function(req, res){
	res.render('users/add', {
		title: 'Registro de Usuarios'
	});
};

exports.list = function(req, res){
	res.render('users/list', {
		title: 'Listado de Usuarios'
	});
};

exports.detail = function(req, res){
	var dataCollection={};
	var idPatient=req.params.identification;

	res.render('users/detail', {
		title: 'Informacion del Usuarios',
		dataId: idPatient
	});

};