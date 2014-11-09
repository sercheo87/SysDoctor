var listMenu = [{
	'id': 'patients',
	'text': 'Pacientes',
	'route': '/patients',
	'icon':'users',
	'show':'in',
	'description':'Administracion de los Pacientes',
	'items': [{
		'id': 'adduser',
		'text': 'Registrar',
		'route': '/patients/add'
	},{
		'id': 'listuser',
		'text': 'Listado',
		'route': '/patients/list'
	},{
		'id': 'history2',
		'text': 'Historial',
		'route': '/history'
	}]
},{
	'id': 'medicals',
	'text': 'Medicamentos',
	'route': '/medicals',
	'icon':'bars',
	'description':'Administracion de los Medicamentos',
	'items': [{
		'id': 'medicals1',
		'text': 'Medicamentos 1',
		'route': '/medicals'
	},{
		'id': 'medicals2',
		'text': 'Medicamentos 2',
		'route': '/medicals'
	}]
},{
	'id': 'Administration',
	'text': 'Administracion',
	'route': '/administration',
	'icon':'key',
	'description':'Administracion',
	'items': [{
		'id': 'admin_city',
		'text': 'Paises',
		'route': '/administration/city'
	}]
}];

var dataInit={
	'menu':listMenu
};
module.exports = dataInit;