var db = require('orm').db;

var MdlPatient = db.define('tbpatient', {
		id_patient: 			{ type: 'number', primary: true, serial: true },
		address: 					{ type: 'text', required: 'false', size: 200},
		email: 						{ type: 'text', required: 'false', size: 200},
		id_city: 					{ type: 'number', required: 'true' },
		id_civil_status: 	{ type: 'number', required: 'true' },
		id_education: 		{ type: 'number', required: 'true' },
		id_profession: 		{ type: 'number', required: 'true' },
		identification: 	{ type: 'text', required: 'true', size: 20},
		last_name: 				{ type: 'text', required: 'true', size: 50},
		name: 						{ type: 'text', required: 'true', size: 50},
		ocupation: 				{ type: 'text', required: 'false', size: 255},
		phone: 						{ type: 'text', required: 'false', size: 20}
}, {
	id:'id_patient'
});