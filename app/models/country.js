var db = require('orm').db;

var MdlCountry = db.define('tbcountry', {
	id: 					{ type: 'number', primary: true, serial: true },
	description: 	{ type: 'text', required: 'true' }
},{
	autoFetch : true,
	cache : false
});