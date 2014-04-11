'use strict';
var db = require('orm').db;

/**
* GetAllItems
*/
exports.GetAllItems=function(req, res) {
	db.models.tbcountry.find(function(err, data){
			if(err){
				console.log([err], ['api_country.GetAllItems'])
				res.send({ 'success': false , 'msg' : 'Error obteniendo listado de paises'});
			}else{
				res.send({ 'success': true , 'data' : data});
			}
		});
};