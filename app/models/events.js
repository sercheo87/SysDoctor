var db = require('orm').db;

var MdlEvents = db.define('tbevents', {
	id_events: 			{ type: 'number', primary: true, serial: true },
	id_patient: 		{ type: 'number'},
	eventstart: 		{ type: 'date', required: false, time: true },
	level: 					{ type: 'text', required: true },
	observation: 		{ type: 'text', required: false },
	confirmed: 			{ type :'boolean', required: false }
},{
	id:'id_events'
});