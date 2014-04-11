'use strict';
var db = require('orm').db;

/**
* Add Recipes
*/
exports.addRecipes=function(req, res) {
	console.log([req.params], ['-->>>>add recipes']);
	db.models.tbrecipes.create([{
		id_appointments: 	req.params.idAppointments,
		medicine: 				req.body.medicine,
		dose: 						req.body.dose,
		observation: 			req.body.observation
	}],function(err,data){
		if(err){
			console.log([err], ['Error in Medical Record Added!']);
			res.send({ 'success': false, 'msg' : 'Error en receta medica' });
		}else{
			console.log([data], ['Medical Record Added!']);
			res.send({ 'success': true, 'msg' : 'Receta Medico registrado'});
		}
	});
};

/**
* Del Recipes
*/
exports.delRecipes=function(req, res) {
	console.log([req.params], ['-->>>>del recipes']);

	db.models.tbrecipes.find({ id_recipes: req.params.idRecipes }).remove(function (err, record) {
		console.log(record);
		if(err){
			console.log([err], ['Error in Getting Medical Record!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo receta medica' });
		}else{
			console.log([record], ['Getting Recipes!']);
			res.send({ 'success': true, 'data' : record, 'msg' : 'Medicamento eliminado de la receta'});
		}
	});

};

/**
* Get Recipes
*/
exports.getRecipes=function(req, res) {
	console.log([req.params], ['-->>>>get recipes']);

	db.models.tbrecipes.find({ id_appointments: req.params.idAppointments }, function (err, record) {
		console.log(record);
		if(err){
			console.log([err], ['Error in Getting Medical Record!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo receta medica' });
		}else{
			console.log([record], ['Getting Recipes!']);
			res.send({ 'success': true, 'data' : record });
		}
	});

};


/**
* Get Recipes
*/
exports.getLisRecipes=function(req, res) {
	console.log([req.params], ['-->>>>get list recipes']);

	db.models.tbrecipes.find({ id_appointments: req.params.idAppointments }, function (err, record) {
		console.log(record);
		if(err){
			console.log([err], ['Error in Getting Medical Record!']);
			res.send({ 'success': false, 'msg' : 'Error obteniendo receta medica' });
		}else{
			console.log([record], ['Getting Recipes!']);
			res.send({ 'success': true, 'data' : record });
		}
	});

};