'use strict';
var db = require('orm').db;

/**
* Add Diet_Detail
*/
exports.addDiet_Detail=function(req, res) {
	db.models.tbdiet_detail.create([{
		id_medical: req.params.idMedical,
		hour_start: req.body.hour_start,
		hour_end: 	req.body.hour_end,
		dmon: 			req.body.dmon,
		dtue: 			req.body.dtue,
		dwed: 			req.body.dwed,
		dthu: 			req.body.dthu,
		dfry: 			req.body.dfry,
		dsat: 			req.body.dsat,
		dsun: 			req.body.dsun
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

	db.models.tbdiet_detail.find({id_medical:req.params.idMedical},function(err, data){
		if(err) {
			res.send({ 'success': false, 'msg' : 'Error obteniendo listado de dietas' });
		}
		res.send({ 'success': true, 'data' : data });
	});

};

/**
* Get All Diet_GroupDetail
*/
exports.removeDiet_Group=function(req, res) {
	console.log([req.params], ['-->>>>remove diet removeDiet_Group']);

	db.models.tbdiet_detail.find({ id_diet_detail : req.params.idEvent }).remove(function (err, record) {
		if(err){
			console.log([err], ['Error in remove Diet Record!']);
			res.send({ 'success': false, 'msg' : 'Error Borrando Dieta' });
		}else{
			console.log('Removing Diets!');
			res.send({ 'success': true, 'msg' : 'Registro de dieta elimado'});
		}
	});

};