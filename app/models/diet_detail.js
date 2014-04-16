var db = require('orm').db;

var MdlDiet_Detail = db.define('tbdiet_detail', {
	id_diet_detail: 	{ type: 'number', primary: true, serial: true },
	id_diet_group: 		{ type: 'number' },
	id_medical: 			{ type: 'number' },
	dmon: 						{ type: 'text', required: 'false' },
	dtue: 						{ type: 'text', required: 'false' },
	dwed: 						{ type: 'text', required: 'false' },
	dthu: 						{ type: 'text', required: 'false' },
	dfry: 						{ type: 'text', required: 'false' },
	dsat: 						{ type: 'text', required: 'false' },
	dsun: 						{ type: 'text', required: 'false' }
},{
	id:'id_diet_detail'
});