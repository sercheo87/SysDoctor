'use strict';
var db = require('orm').db;

/**
* Add Patient
*/
exports.addPatient=function(req, res) {
		console.log([req.body], ['-->>>>add user']);
	db.models.tbpatient.find(function(err, data){
		if(err) throw new Error(err);
		res.json(data);
	});
};
