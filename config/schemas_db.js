'use strict';
var db = require('orm').db;
var mysql = require('mysql');
var Sync = require('sql-ddl-sync').Sync;

module.exports = function(orm){

	db.settings.set("properties.association_key", "{field}");
/*
	db.models.tbcity.hasOne('country', db.models.tbcountry,{required: true});
	db.models.tbmedicine.hasOne('groupmedicine', db.models.tbgroupmedicine,{required: true});
	db.models.tbevents.hasOne('patient', db.models.tbpatient);
	*/
	db.models.tbcity.sync();
	db.models.tbpatient.sync();
	db.models.tbmedicine.sync();
	db.models.tbevents.sync();
	db.sync();

	var sync = new Sync({
		dialect : 'mysql',
		db      : orm.db.driver.db,
		debug   : function (text) {
			console.log('> %s', text);
		}
	});

	/* Tablas */
	sync.defineCollection('tbpatient', {
		id_patient: 			{ type: 'number', primary: true, serial: true },
		address: 					{ type: 'text', required: false, size: 200 },
		email: 						{ type: 'text', required: false, size: 200 },
		id_city: 					{ type: 'number', required: true },
		id_civil_status: 	{ type: 'number', required: true },
		id_education: 		{ type: 'number', required: true },
		id_profession: 		{ type: 'number', required: true },
		identification: 	{ type: 'text', required: true, size: 20 },
		last_name: 				{ type: 'text', required: true, size: 50 },
		name: 						{ type: 'text', required: true, size: 50 },
		ocupation: 				{ type: 'text', required: false, size: 255 },
		phone: 						{ type: 'text', required: false, size: 20 },
		birthday: 				{ type: 'date', required: true, time: false },
		sex: 							{ type: 'enum', required: true, size: 1, values: [ 'F', 'M', 'O' ], defaultValue:'M' },
		emergency_phone: 	{ type: 'text', required: false, size: 20 },
		emergency_name: 	{ type: 'text', required: false, size: 80 },
		emergency_kin: 		{ type: 'text', required: false, size: 20 },
		birthplace: 			{ type: 'text', required: true, size: 50 }
	});

sync.defineCollection('tbusers', {
	iduser: 		{ type: 'number', primary: true, serial: true },
	name: 			{ type: 'text', required: true },
	lastname: 	{ type: 'text', required: true },
	datebirth: 	{ type: 'date', required: false, time: false },
	state: 			{ type: 'boolean', required: true },
	login: 			{ type: 'text', required: true },
	pass: 			{ type: 'text', required: true },
	rol: 				{ type: 'text', required: true}
});

sync.defineCollection('tbcivilstatus', {
	id: 					{ type: 'number', primary: true, serial: true },
	description: 	{ type: 'text', required: true }
});

sync.defineCollection('tbprofession', {
	id: 					{ type: 'number', primary: true, serial: true },
	description: 	{ type: 'text', required: true }
});

sync.defineCollection('tbcountry', {
	id: 					{ type: 'number', primary: true, serial: true },
	description: 	{ type: 'text', required: true }
});

sync.defineCollection('tbcity', {
	id: 					{ type: 'number', primary: true, serial: true, unique: true },
	country_id: 	{ type: 'number' },
	description: 	{ type: 'text', required: true }
});

sync.defineCollection('tbmedicine', {
	id: 								{ type: 'number', primary: true, serial: true },
	medicinegroup_id: 	{ type: 'number' },
	description: 				{ type: 'text', required: 'true' }
});

sync.defineCollection('tbgroupmedicine', {
	id: 					{ type: 'number', primary: true, serial: true },
	description: 	{ type: 'text', required: true }
});

sync.defineCollection('tbmedicalrecord', {
	id_medical: 	{ type: 'number', primary: true, serial: true },
	id_patient: 	{ type: 'number', unique: true },
	habit: 				{ type: 'text', required: false, size: 500, defaultValue:'N/A' },
	antecedent: 	{ type: 'text', required: false, size: 500, defaultValue:'N/A' },
	alergy: 			{ type: 'text', required: false, size: 500, defaultValue:'N/A' },
	date_reg: 		{ type: 'date', required: false, time: false },
	observation: 	{ type: 'text', required: false, size: 500, defaultValue:'N/A' },
	blood_type: 	{ type: 'text', required: false, size: 10, defaultValue:'N/A' }
});

sync.defineCollection('tbmedicalappointments', {
	id_appointments: 		{ type: 'number', primary: true, serial: true },
	id_medical: 				{ type: 'number'},
	date_reg: 					{ type: 'date', required: false, time: true },
	rweight: 						{ type: 'number', required: true },
	rsize: 							{ type: 'number', required: true },
	pulse: 							{ type: 'number', required: true },
	blood_pressure: 		{ type: 'text', required: true },
	reason: 						{ type: 'text', required: true },
	observation: 				{ type: 'text', required: true }
});

sync.defineCollection('tbrecipes', {
	id_recipes: 			{ type: 'number', primary: true, serial: true },
	id_appointments: 	{ type: 'number'},
	medicine: 				{ type: 'text', required: true },
	dose: 						{ type: 'text', required: true },
	observation: 			{ type: 'text', required: true }
});

sync.defineCollection('tbevents', {
	id_events: 			{ type: 'number', primary: true, serial: true },
	id_patient: 		{ type: 'number'},
	eventstart: 		{ type: 'date', required: false, time: true },
	level: 					{ type: 'text', required: true },
	observation: 		{ type: 'text', required: false },
	confirmed: 			{ type :'boolean', required: false }
});

sync.defineCollection('tbdiet_detail', {
	id_diet_detail: 	{ type: 'number', primary: true, serial: true },
	id_medical: 			{ type: 'number' },
	hour_start: 			{ type: 'text', required: 'false' },
	hour_end: 				{ type: 'text', required: 'false' },
	dmon: 						{ type: 'text', required: 'false' },
	dtue: 						{ type: 'text', required: 'false' },
	dwed: 						{ type: 'text', required: 'false' },
	dthu: 						{ type: 'text', required: 'false' },
	dfry: 						{ type: 'text', required: 'false' },
	dsat: 						{ type: 'text', required: 'false' },
	dsun: 						{ type: 'text', required: 'false' }
});

	//db.drop(function(){
		sync.sync(function (err) {
			if (err) {
				console.log('> Sync Error');
				console.log(err);
			} else {
				console.log('> Sync Done');

				/* Valores Default */
			// Usuario Adminisrador Manager
			db.models.tbusers.count({ login: 'admin' }, function (err, count) {
				if(count==0){
					console.log('Creating Record User Manager');
					
					db.models.tbusers.create([{
						name:'Administrator',
						lastname:'Manager',
						datebirth :'2014/01/01',
						state:true,
						login:'admin',
						pass:'1234'
					}],function(err,data){
						if(err){
							console.log(err);
							res.send(500, {error: 'Error en establecimiento de Data por Default'});
						}
					});

					db.models.tbusers.create([{
						name:'Invitado',
						lastname:'Guest',
						datebirth :'2014/01/01',
						state:true,
						login:'guest',
						pass:'1234'
					}],function(err,data){
						if(err){
							console.log(err);
							res.send(500, {error: 'Error en establecimiento de Data por Default'});
						}
					});

				}
			});

			// Estado Civil
			db.models.tbcivilstatus.count({}, function (err, count) {
				if(count==0){
					console.log('Creating Record Civil Status');
					db.models.tbcivilstatus.create([
						{ description:'Casado' },
						{ description:'Soltero' },
						{ description:'Viudo' },
						{ description:'Divorciado' },
						{ description:'Union Libre' },
						{ description:'Otro' }
						],function(err,data){
							if(err){
								console.log(err);
								res.send(500, {error: 'Error en establecimiento de Data por Default'});
							}
						});
				}
			});

			// Profesiones
			db.models.tbprofession.count({}, function (err, count) {
				if(count==0){
					console.log('Creating Record Professions');
					db.models.tbprofession.create([
						{ description:'Ninguno' },
						{ description:'Ama de Casa' },
						{ description:'Ingeniero' },
						{ description:'Doctor' },
						{ description:'Secretaria' },
						{ description:'Obrero' }
						],function(err,data){
							if(err){
								console.log(err);
								res.send(500, {error: 'Error en establecimiento de Data por Default'});
							}
						});
				}
			});

			// Paises
			db.models.tbcountry.count({}, function (err, count) {
				if(count==0){
					console.log('Creating Record Country');
					db.models.tbcountry.create([
						{ description:'Colombia' },
						{ description:'Ecuador' },
						{ description:'Chile' },
						{ description:'Argentina' },
						{ description:'Peru' },
						{ description:'Mexico' }
						],function(err,data){
							if(err){
								console.log(err);
								res.send(500, {error: 'Error en establecimiento de Data por Default'});
							}
						});
				}
			});

			// Ciudad
			db.models.tbcity.count({}, function (err, count) {
				if(count==0){
					console.log('Creating Record City');
					db.models.tbcity.create([
						{ country_id: 2, description:'Quito' },
						{ country_id: 2, description:'Portoviejo' },
						{ country_id: 2, description:'Guayas' }
						],function(err,data){
							if(err){
								console.log(err);
								res.send(500, {error: 'Error en establecimiento de Data por Default'});
							}
						});
				}
			});

		}
	//});
});
};