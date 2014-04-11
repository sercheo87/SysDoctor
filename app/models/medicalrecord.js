var db = require('orm').db;

var MdlMedicalRecord = db.define('tbmedicalrecord', {
	id_medical: 	{ type: 'number', primary: true, serial: true },
	id_patient: 	{ type: 'number', unique: true},
	habit: 				{ type: 'text', required: false, size: 500, defaultValue:'N/A' },
	antecedent: 	{ type: 'text', required: false, size: 500, defaultValue:'N/A' },
	alergy: 			{ type: 'text', required: false, size: 500, defaultValue:'N/A' },
	date_reg: 		{ type: 'date', required: false, time: false },
	observation: 	{ type: 'text', required: false, size: 500, defaultValue:'N/A' },
	blood_type: 	{ type: 'text', required: false, size: 10, defaultValue:'N/A' }
},{
	id : 'id_medical',
	autoFetch : true,
	cache : false
});