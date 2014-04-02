module.exports = function(app, data_init){

/* ========================== ROUTE ====================== */
  //home route
  var home = require('../app/controllers/ctrl_home');
  app.get('/',home.index);

  // Administracion
  var administration = require('../app/controllers/ctrl_administration');
  app.get('/administration', csrf, administration.index);

  // Patients
  var patients = require('../app/controllers/ctrl_patients');
  app.get('/patients/add', patients.add);
  app.get('/patients/list', patients.list);
  app.get('/patients/detail/:id', patients.detail);




/* =========================== API ======================== */
  // Menu
  app.post('/api/menu', function(req, res) {
    if(req.session.authenticate=='true')
      res.send({'data':data_init.menu});
    else
      res.send({'data':''});
  });

  // Medicinas
  var api_medicine=require('../app/apis/api_medicine');
  app.get('/api/medicine/list', csrf, api_medicine.GetAllMedicines);

  // Groupo de Medicinas
  var api_groupMedicine=require('../app/apis/api_groupMedicine');
  app.get('/api/group_medicine/list', csrf, api_groupMedicine.GetAllGroupMedicines);

  // Usuarios
  var api_user=require('../app/apis/api_user');
  app.get('/api/users', csrf, api_user.GetAllUsers);
  app.get('/api/users/:login', api_user.GetUser);
  app.post('/api/users/:login', api_user.GetUser);
  app.all('*', function(req, res){
    res.send(404);
  })

  app.locals.errors = {};
  app.locals.message = {};

  function csrf(req, res, next) {
    res.locals.token = req.session._csrf;
    if(req.session.authenticate=='true')
      next();
    else
      res.redirect("/");
  }
};
