var db = require('orm').db;

var MdlCivilStatus = db.define('tbcivilstatus', {
	id: 					{ type: 'number', primary: true, serial: true },
	description: 	{ type: 'text', required: 'true' }
}
);