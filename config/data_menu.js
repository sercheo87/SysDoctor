var listMenu = [{
  'id': 'patients',
  'text': 'Pacientes',
  'route': '/patients',
  'icon':'users',
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
  'items': [{
    'id': 'medicals1',
    'text': 'Medicamentos 1',
    'route': '/medicals'
  },{
    'id': 'medicals2',
    'text': 'Medicamentos 2',
    'route': '/medicals'
  }]
}];

var dataInit={
  'menu':listMenu
};
module.exports = dataInit;