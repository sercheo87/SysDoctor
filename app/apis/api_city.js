'use strict';
var db = require('orm').db;

/**
* GetAllItems
*/
exports.GetAllItems=function(req, res) {
	var idconuntry=req.params.id;
	db.models.tbcity.find({ country_id : idconuntry }, function(err, data){
		console.log([idconuntry], ['req']);
		if(err){
			console.log([err], ['api_city.GetAllItems'])
			res.send({ 'success': false , 'msg' : 'Error obteniendo listado ciudades'});
		}else{
			res.send({ 'success': true , 'data' : data});
		}
	});
};