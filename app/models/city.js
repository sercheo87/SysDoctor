var db = require('orm').db;

var MdlCity = db.define('tbcity', {
	id: 					{ type: 'number', primary: true, serial: true },
	country_id: 	{ type: 'number' },
	description: 	{ type: 'text', required: 'true' }
},{
	id:'id'
});


/*
MdlCity.get(1, function (err, city) {
	// animal is the animal model instance, if found
	console.log([city], ['>>>>>>>>>>>>>>>>>>']);
	city.getCountry(function (err, country) {
		// if animal has really an owner, person points to it
		console.log([country], ['>>>>>>>>>>>>>>>>>>']);
	});
});
*/