var express 		= require('express'),
orm 						= require('orm'),
fs 							= require('fs'),
data_init 			= require('./config/data_menu'),
config 					= require('./config/config'),
clientSessions 	= require('client-sessions'),
http 						= require('http');

var app = express();

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

require('./config/schemas_db')(orm);
require('./config/express')(app, config, clientSessions);
require('./config/routes')(app, data_init);

//app.listen(config.port);
var nicknames = {};

/* Servidor de chat */
var server = http.createServer(app).listen(config.port);
var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
	socket.on('user message', function (msg) {
		socket.broadcast.emit('user message', socket.nickname, msg);
	});

	socket.on('nickname', function (nick, fn) {
		if (nicknames[nick]) {
			fn(true);
		} else {
			fn(false);
			nicknames[nick] = socket.nickname = nick;
			socket.broadcast.emit('announcement', nick + ' connected');
			io.sockets.emit('nicknames', nicknames);
		}
	});

	socket.on('disconnect', function () {
		if (!socket.nickname) return;

		delete nicknames[socket.nickname];
		socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
		socket.broadcast.emit('nicknames', nicknames);
	});
});
