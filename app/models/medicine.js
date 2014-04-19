var db = require('orm').db;

var MdlMedicine = db.define('tbmedicine', {
	id: 								{ type: 'number', primary: true, serial: true },
	medicinegroup_id: 	{ type: 'number' },
	description: 				{ type: 'text', required: 'true' }
},{
	id:'id',
	autoFetch : true,
	cache : false
});