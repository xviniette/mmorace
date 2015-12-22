var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var uuid = require('node-uuid');
var fs = require('fs');
var crypto = require('crypto');
var mysql = require('mysql');
var PNG = require('png-js');

server.listen(1323);

//base de donnee
var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'smk'
});

db.connect(function(err){
	if(err) {
		console.log("Error connecting database \n\n");  
		process.exit();
	}else{
		console.log("Database : OK");
	}
});

eval(fs.readFileSync('./public/js/Mysql.js')+'');
var MysqlManager = new Mysql(db);
MysqlManager.everybodyOffline();

eval(fs.readFileSync('./public/js/config.js')+'');
eval(fs.readFileSync('./public/js/common.js')+'');
eval(fs.readFileSync('./public/js/Elo.js')+'');
eval(fs.readFileSync('./public/js/Game.js')+'');
eval(fs.readFileSync('./public/js/Room.js')+'');
eval(fs.readFileSync('./public/js/Map.js')+'');
eval(fs.readFileSync('./public/js/Player.js')+'');
eval(fs.readFileSync('./public/js/Car.js')+'');
eval(fs.readFileSync('./public/js/UniqueNumber.js')+'');
eval(fs.readFileSync('./public/js/serverUtils.js')+'');

//ROUTING
app.get( '/user/:id' , function( req, res, next ) {
	MysqlManager.getUserById(req.params.id, function(data){
		res.json(data);
	});
});

app.get( '/race/:id' , function( req, res, next ) {
	MysqlManager.getRace(req.params.id, function(data){
		if(data != null){
			MysqlManager.getTemps(req.params.id, function(temps){
				data.times = temps;
				res.json(data);
			});	
		}
	});
});

app.get( '/ranking/:type/:desc/:min/:max' , function( req, res, next ) {
	MysqlManager.getRanking(req.params.type, req.params.desc, req.params.min, req.params.max, function(data){
		res.json(data);
	});
});

app.get('/',function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.get( '/*' , function( req, res, next ) {
	var file = req.params[0];
	res.sendFile( __dirname + '/public/' + file );
});



var unRoom = new UniqueNumber(1);
var unPlayer = new UniqueNumber(1);

var isServer = true;
var game = new Game();

game.initMaps();

//physic game
setInterval(function(){
	game.update();
}, 1000/FPS);

io.on('connection', function(socket){
	socket.emit("login", true);
	socket.emit("playersStats", game.getNbPlayers());

	socket.on("signin", function(data){
		Utils.onSignin(data, socket);
	});

	socket.on("login", function(data){
		Utils.onLogin(data, socket);
	});

	socket.on("inputs", function(data){
		Utils.onInputs(data, socket);
	});

	socket.on("participate", function(data){
		Utils.onParticipate(data, socket);
	});

	socket.on("disconnect", function(){
		Utils.onDisconnect(socket);
	});
});

