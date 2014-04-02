exports.index = function(req, res){
  res.render('home/administration', {
    title: 'Consultorio Medico'
  });
};