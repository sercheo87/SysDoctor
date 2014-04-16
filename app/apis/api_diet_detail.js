'use strict';
var db = require('orm').db;

/**
* Add Diet_Detail
*/
exports.addDiet_Detail=function(req, res) {
	db.models.tbdiet_detail.create([{
		name: 	req.body.name
	}],function(err,data){
		if(err){
			console.log([err], ['Error in Diet_Detail Added!']);
			res.send({ 'success': false, 'msg' : 'Error en registro del grupo de dieta' });
		}else{
			console.log(['Diet_Detail Added!']);
			res.send({ 'success': true, 'msg' : 'Grupo de Dieta Registrada'});
		}
	});
};

/**
* Get All Diet_GroupDetail
*/
exports.getAllDiet_GroupList=function(req, res) {
	console.log([req.params], ['-->>>>get list Diet_GroupDetail']);
	db.models.tbdiet_detail.find().each(function (data) {
		data.getDiet_group(function (dt){
			return dt;
		});
		return data;
	}).get(function (data){
		console.log(['Getting Diet_GroupDetail!']);
		res.send({ 'success': true, 'data' : data });
	});
};