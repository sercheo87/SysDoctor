var express = require('express'),
orm = require('orm'),
fs = require('fs'),
data_init = require('./config/data_menu'),
config = require('./config/config'),
clientSessions = require('client-sessions');

orm.db = orm.connect(config.db, function(err, db){
	if(err){
		console.log('Error conectandose a la Base de Datos', err);
		return ;
	}

	console.log('Connect to Database');
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
	if (file.indexOf('.js') >= 0) {
		require(modelsPath + '/' + file);
	}
});

var app = express();

require('./config/schemas_db')(orm);
require('./config/express')(app, config, clientSessions);
require('./config/routes')(app, data_init);

app.listen(config.port);
