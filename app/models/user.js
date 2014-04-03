var db = require('orm').db;

var MdlUsers = db.define('tbusers', {
	iduser: 		{ type: 'number', primary: true, serial: true },
	name: 			{ type: 'text', required: 'true' },
	lastname: 	{ type: 'text', required: 'true' },
	datebirth: 	{ type: 'date', required: 'false', time: false },
	state: 			{ type: 'boolean', required: 'true' },
	login: 			{ type: 'text', required: 'true' },
	pass: 			{ type: 'text', required: 'true' }
}, {
	id:'iduser'
});