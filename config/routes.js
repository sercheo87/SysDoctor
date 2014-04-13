module.exports = function(app, data_init){

/* ========================== ROUTE ====================== */
	//home route
	var home = require('../app/controllers/ctrl_home');
	app.get('/',home.index);

	// Administracion
	var administration = require('../app/controllers/ctrl_administration');
	app.get('/administration', administration.index);

	// Patients
	var patients = require('../app/controllers/ctrl_patients');
	app.get('/patients/add', csrf, patients.add);
	app.get('/patients/list', patients.list);
	app.get('/patients/detail/:identification', patients.detail);

	//Reports
	var receipts = require('../app/controllers/ctrl_receipts')
	app.get('/receipt/inquiry/:idPatient',receipts.inquiry)



/* =========================== API ======================== */
	// Menu
	app.post('/api/menu', function(req, res) {
		if(req.session.authenticate=='true')
			res.send({'data':data_init.menu});
		else
			res.send({'data':''});
	});

	// Medicine
	var api_medicine=require('../app/apis/api_medicine');
	app.get('/api/medicine/list', csrf, api_medicine.GetAllMedicines);

	// Group Medicine
	var api_groupMedicine=require('../app/apis/api_groupMedicine');
	app.get('/api/group_medicine/list', csrf, api_groupMedicine.GetAllGroupMedicines);

	// Users
	var api_user=require('../app/apis/api_user');
	app.get('/api/users', csrf, api_user.GetAllUsers);
	app.get('/api/users/:login', api_user.GetUser);
	app.post('/api/users/:login', api_user.GetUser);

	// Patients
	var api_patient=require('../app/apis/api_patient');
	app.put('/api/patients/add', csrf, api_patient.addPatient);
	app.get('/api/patients/list', api_patient.getListPatient);
	app.get('/api/patients/list/:identification', api_patient.getPatient);
	app.get('/api/patients/searchLive*', api_patient.getListSearchPatient);

	// Civil Status
	var api_civilStatus=require('../app/apis/api_civilStatus');
	app.get('/api/civilStatus/list', csrf, api_civilStatus.GetAllItems);

	// Profession
	var api_profession=require('../app/apis/api_profession');
	app.get('/api/profession/list', csrf, api_profession.GetAllItems);

	// Country
	var api_country=require('../app/apis/api_country');
	app.get('/api/country/list', csrf, api_country.GetAllItems);

	// City
	var api_city=require('../app/apis/api_city');
	app.get('/api/city/list/:id', csrf, api_city.GetAllItems);

	// Medical Record
	var api_medicalRecord=require('../app/apis/api_medicalRecord');
	app.put('/api/medical/record/:idPatient', api_medicalRecord.addMedicalRecord);
	app.get('/api/medical/record/:idMedical', api_medicalRecord.getMedicalRecord);
	app.get('/api/medical/record/list/:idPatient', api_medicalRecord.getListMedicalRecord);

	// Medical Appointments
	var api_medicalAppointments=require('../app/apis/api_medicalAppointments');
	app.get('/api/medical/appointments/calendar', api_medicalAppointments.getCalendarMedicalAppointments);
	app.put('/api/medical/appointments/:idMedical', api_medicalAppointments.addMedicalAppointments);
	app.get('/api/medical/appointments/:idAppointments', api_medicalAppointments.getMedicalAppointments);
	app.get('/api/medical/appointments/list/:idMedical', api_medicalAppointments.getListMedicalAppointments);

	// Recipes
	var api_recipes=require('../app/apis/api_recipes');
	app.put('/api/medical/recipes/:idAppointments', api_recipes.addRecipes);
	app.del('/api/medical/recipes/:idRecipes', api_recipes.delRecipes);
	app.get('/api/medical/recipes/:idAppointments', api_recipes.getRecipes);
	app.get('/api/medical/recipes/list/:idAppointments', api_recipes.getLisRecipes);


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
