'use strict';
var db = require('orm').db;
/**
 * GetAllItems
 */
exports.GetAllItems = function (req, res) {
	var idconuntry = req.params.id;
	db.models.tbcity.find({
		country_id: idconuntry
	}, function (err, data) {
		console.log([idconuntry], ['req']);
		if (err) {
			console.log([err], ['api_city.GetAllItems'])
			res.send({
				'success': false,
				'msg': 'Error obteniendo listado ciudades'
			});
		} else {
			res.send({
				'success': true,
				'data': data
			});
		}
	});
};
/**
 * Get City Record
 */
exports.getCityRecord = function (req, res) {
	console.log([req.params], ['>>>>get city']);
	db.models.tbcity.find({
		id: req.params.id
	}, function (err, city) {
		if (err) {
			console.log([err], ['Error in Getting City!']);
			res.send({
				'success': false,
				'msg': 'Error obteniendo el paciente'
			});
		} else {
			console.log(['Getting City!']);
			res.send({
				'success': true,
				'data': city
			});
		}
	});
}
/**
 * Remove City Record
 */
exports.removeCityRecord = function (req, res) {
	console.log([req.params], ['>>>>remove city']);
	db.models.tbcity.find({
		id: req.params.id
	}).remove(function (err, record) {
		if (err) {
			console.log([err], ['Error in remove city Record!']);
			res.send({
				'success': false,
				'msg': 'Error Borrando Ciudad'
			});
		} else {
			console.log('Removing Diets!');
			res.send({
				'success': true,
				'msg': 'Registro de Ciudad elimado'
			});
		}
	});
}
/**
 * addCityRecord
 */
exports.addCityRecord = function (req, res) {
	console.log([req.params], ['>>>>update city']);
	db.models.tbcity.exists({
		id: req.params.id
	}, function (err, exists) {
		if (err) {
			console.log([err], ['Error in Getting Medical Record!']);
			res.send({
				'success': false,
				'msg': 'Error obteniendo registro ciudad'
			});
		}
		if (exists) {
			db.models.tbcity.get(1, {
				id: req.params.id
			}, function (err, record) {
				console.log('Registro obtenido:', record);
				if (err) {
					console.log([err], ['Error in Getting City Record!']);
					res.send({
						'success': false,
						'msg': 'Error obteniendo registro ciudad'
					});
				}
				record.description = req.body.description;
				record.save(function (err) {
					if (err) {
						console.log([err], ['Error in Getting Medical Record!']);
						res.send({
							'success': false,
							'msg': 'Error obteniendo registro ciudad'
						});
					} else {
						console.log([record], ['Updating City Record!']);
						res.send({
							'success': true,
							'data': record,
							'msg': 'Registro Ciudad Actualizado'
						});
					}
				});
			});
		} else {
			db.models.tbcity.create([{
				country_id: req.body.country_id,
				description: req.body.description
			}], function (err, data) {
				if (err) {
					console.log([err], ['Error in Ciudad Record Added!']);
					res.send({
						'success': false,
						'msg': 'Error en registro medico'
					});
				} else {
					console.log([data], ['Ciudad Record Added!']);
					res.send({
						'success': true,
						'msg': 'Registro Medico registrado'
					});
				}
			});
		}
	});
}