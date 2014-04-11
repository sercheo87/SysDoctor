var db = require('orm').db;

var MdlMedicalAppointments = db.define('tbmedicalappointments', {
	id_appointments: 		{ type: 'number', primary: true, serial: true },
	id_medical: 				{ type: 'number'},
	date_reg: 					{ type: 'date', required: false, time: true },
	rweight: 						{ type: 'number', required: true },
	rsize: 							{ type: 'number', required: true },
	pulse: 							{ type: 'number', required: true },
	blood_pressure: 		{ type: 'text', required: true },
	reason: 						{ type: 'text', required: true },
	observation: 				{ type: 'text', required: true }
},{
	id:'id_appointments',
	autoFetch : true,
	cache : false
});