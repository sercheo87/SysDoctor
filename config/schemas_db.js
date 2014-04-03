'use strict';
var db = require('orm').db;
var mysql = require('mysql');
var Sync = require('sql-ddl-sync').Sync;

module.exports = function(orm){

	var sync = new Sync({
		dialect : 'mysql',
		db      : orm.db.driver.db,
		debug   : function (text) {
			console.log('> %s', text);
		}
	});

	/* Estructuras de la BD*/

	/* Tablas */
	sync.defineCollection('tbpatient', {
		id_patient: 			{ type: 'number', primary: true, serial: true },
		address: 					{ type: 'text', required: 'false', size: 200},
		email: 						{ type: 'text', required: 'false', size: 200},
		id_city: 					{ type: 'number', required: 'true' },
		id_civil_status: 	{ type: 'number', required: 'true' },
		id_education: 		{ type: 'number', required: 'true' },
		id_profession: 		{ type: 'number', required: 'true' },
		identification: 	{ type: 'text', required: 'true', size: 20},
		last_name: 				{ type: 'text', required: 'true', size: 50},
		name: 						{ type: 'text', required: 'true', size: 50},
		ocupation: 				{ type: 'text', required: 'false', size: 255},
		phone: 						{ type: 'text', required: 'false', size: 20}
	});

	sync.defineCollection('tbusers', {
		iduser: 		{ type: 'number', primary: true, serial: true },
		name: 			{ type: 'text', required: 'true' },
		lastname: 	{ type: 'text', required: 'true' },
		datebirth: 	{ type: 'date', required: 'false', time: false },
		state: 			{ type: 'boolean', required: 'true' },
		login: 			{ type: 'text', required: 'true' },
		pass: 			{ type: 'text', required: 'true' }
	});

	sync.defineCollection('tbcivilstatus', {
		id: 					{ type: 'number', primary: true, serial: true },
		description: 	{ type: 'text', required: 'true' }
	});

	sync.defineCollection('tbprofession', {
		id: 					{ type: 'number', primary: true, serial: true },
		description: 	{ type: 'text', required: 'true' }
	});


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
					console.log('Creating User Manager');
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
							res.send(500, {error: "Error en establecimiento de Data por Default"});
						}
					});
				}
			});

			// Estado Civil
			db.models.tbcivilstatus.count({}, function (err, count) {
				if(count==0){
					console.log('Creating Civil Status');
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
								res.send(500, {error: "Error en establecimiento de Data por Default"});
							}
						});
				}
			});

			// Profesiones
			db.models.tbprofession.count({}, function (err, count) {
				if(count==0){
					console.log('Creating Professions');
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
								res.send(500, {error: "Error en establecimiento de Data por Default"});
							}
						});
				}
			});

		}
	});
};