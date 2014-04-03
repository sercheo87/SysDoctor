'use strict';
var db = require('orm').db;

/**
* GetAllItems
*/
exports.GetAllItems=function(req, res) {
	db.models.tbprofession.find(function(err, data){
			if(err){
				console.log([err], ['api_profession.GetAllItems'])
				res.send({ 'success': false , 'msg' : 'Error obteniendo listado de profesiones'});
			}else{
				res.send({ 'success': true , 'data' : data});
			}
		});
};