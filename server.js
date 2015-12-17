var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var uuid = require('node-uuid');
var fs = require('fs');
var crypto = require('crypto');
var mysql = require('mysql');

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

eval(fs.readFileSync('./public/js/config.js')+'');
eval(fs.readFileSync('./public/js/common.js')+'');
eval(fs.readFileSync('./public/js/Game.js')+'');
eval(fs.readFileSync('./public/js/Room.js')+'');
eval(fs.readFileSync('./public/js/Map.js')+'');
eval(fs.readFileSync('./public/js/Player.js')+'');
eval(fs.readFileSync('./public/js/UniqueNumber.js')+'');
eval(fs.readFileSync('./public/js/serverUtils.js')+'');

//ROUTING
app.get('/',function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.get( '/user/:id' , function( req, res) {
	MysqlManager.getUserById(req.params.id, function(r){
		if(r != null){
			delete r.password;
			delete r.email;
		}
		res.json(r);
	});
});

app.get( '/rank/:type/:desc/:min/:max' , function( req, res) {
	MysqlManager.getRanking(req.params.type, req.params.desc, req.params.min, req.params.max, function(r){
		res.json(r);
	});
});

app.get( '/mapRank/:id/:min/:max' , function( req, res) {
	MysqlManager.getRankingMap(req.params.id, req.params.min, req.params.max, function(r){
		res.json(r);
	});
});

app.get( '/*' , function( req, res, next ) {
	var file = req.params[0];
	res.sendFile( __dirname + '/' + file );
});

var unRoom = new UniqueNumber(1);
var unPlayer = new UniqueNumber(1);

var isServer = true;
var game = new Game();


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

	socket.on("join", function(){
		Utils.onDisconnect(socket);
	});

	socket.on("disconnect", function(){
		Utils.onDisconnect(socket);
	});
});

