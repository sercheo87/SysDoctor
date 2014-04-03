'use strict';
var db = require('orm').db;

/**
* GetAllItems
*/
exports.GetAllItems=function(req, res) {
	db.models.tbcivilstatus.find(function(err, data){
			if(err){
				console.log([err], ['api_civilStatus.GetAllItems'])
				res.send({ 'success': false , 'msg' : 'Error obteniendo listado de estado civil'});
			}else{
				res.send({ 'success': true , 'data' : data});
			}
		});
};