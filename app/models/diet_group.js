var db = require('orm').db;

var MdlDiet_Group = db.define('tbdiet_group', {
	id_diet_group: 	{ type: 'number', primary: true, serial: true },
	name: 					{ type: 'text', required: 'true' }
},{
	id:'id_diet_group'
});