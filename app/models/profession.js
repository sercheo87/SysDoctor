var db = require('orm').db;

var MdlProfession = db.define('tbprofession', {
	id: 					{ type: 'number', primary: true, serial: true },
	description: 	{ type: 'text', required: 'true' }
},{
	id:'id',
	autoFetch : true,
	cache : false
});