var db = require('orm').db;
exports.index = function (req, res) {
	res.render('home/administration', {
		title: 'Consultorio Medico'
	});
};
exports.city = function (req, res) {
	db.models.tbcountry.find(function (err, data) {
		if (err) {
			console.log([err], ['api_country.GetAllItems'])
			res.send({
				'success': false,
				'msg': 'Error obteniendo listado de paises'
			});
		} else {
			var dataRet = JSON.stringify(data)
			res.render('administration/city', {
				title: 'Paises',
				dataCollection: dataRet
			});
		}
	});
};