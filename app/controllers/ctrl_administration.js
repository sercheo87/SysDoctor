exports.index = function(req, res){
	res.render('home/administration', {
		title: 'Consultorio Medico'
	});
};

exports.city = function(req, res){
	res.render('administration/city', {
		title: 'Paises'
	});
};