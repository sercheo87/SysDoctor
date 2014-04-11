var db = require('orm').db;

var MdlGroupMedicine = db.define('tbgroupmedicine',{
	id: 					{ type: 'number', primary: true, serial: true },
	description: 	{ type: 'text', required: 'true' }
},{
	autoFetch : true,
	cache : false
});