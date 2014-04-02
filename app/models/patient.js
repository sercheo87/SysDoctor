var db = require('orm').db;

var MdlPatient = db.define('tbpatient', {
	id_patient: { type: "number", required: "false" },
	address: { type: "text", required: "false" },
	email: { type: "text", required: "false" },
	id_city: { type: "number" },
	id_civil_status: { type: "number" },
	id_education: { type: "number", required: "true" },
	id_profession: { type: "number", required: "true" },
	identification: { type: "text", required: "true" },
	last_name: { type: "text", required: "true" },
	name: { type: "text", required: "true" },
	ocupation: { type: "text", required: "false" },
	phone: { type: "text", required: "false" }
}, {
	id:'id_patient'
});