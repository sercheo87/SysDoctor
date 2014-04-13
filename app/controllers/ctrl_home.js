exports.index = function(req, res){
  res.render('home/index', {
    title: 'Consultorio Medico'
  });
};

exports.showFailed = function(req, res){
    res.render('home/index', {
      title: 'Generator-Express MVC',
      msg: 'ERROR USUARIO NO ENCONTRADO'
    });
};

exports.showDefault = function(req, res){
    res.render('home/default', {
      title: 'Generator-Express MVC'
    });
};

