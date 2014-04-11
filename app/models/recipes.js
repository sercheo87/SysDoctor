var db = require('orm').db;

var MdlRecipes = db.define('tbrecipes', {
	id_recipes: 			{ type: 'number', primary: true, serial: true },
	id_appointments: 	{ type: 'number'},
	medicine: 				{ type: 'text', required: true },
	dose: 						{ type: 'text', required: true },
	observation: 			{ type: 'text', required: true }
},{
	id: 'id_recipes',
	autoFetch : true,
	cache : false
});