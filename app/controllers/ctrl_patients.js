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
	var idPatient=req.params.id;
	var _patients=[{
		nombres:'juan augusto campos'
	}];
	res.render('patients/detail', {
		title: 'Informacion del Paciente',
		data: _patients
	});
};