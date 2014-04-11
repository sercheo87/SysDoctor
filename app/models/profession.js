var db = require('orm').db;

var MdlProfession = db.define('tbprofession', {
	id: 					{ type: 'number', primary: true, serial: true },
	description: 	{ type: 'text', required: 'true' }
},{
	autoFetch : true,
	cache : false
});