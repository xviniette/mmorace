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
eval(fs.readFileSync('./public/js/Drops.js')+'');
eval(fs.readFileSync('./public/js/Game.js')+'');
eval(fs.readFileSync('./public/js/Room.js')+'');
eval(fs.readFileSync('./public/js/Map.js')+'');
eval(fs.readFileSync('./public/js/Player.js')+'');
eval(fs.readFileSync('./public/js/Car.js')+'');
eval(fs.readFileSync('./public/js/UniqueNumber.js')+'');
eval(fs.readFileSync('./public/js/serverUtils.js')+'');


eval(fs.readFileSync('./routing.js')+'');
eval(fs.readFileSync('./socketEvents.js')+'');

var unRoom = new UniqueNumber(1);
var unPlayer = new UniqueNumber(1);

var isServer = true;
var game = new Game();

game.initMaps();
game.initSkins();

//physic game
setInterval(function(){
	game.update();
}, 1000/FPS);

setInterval(function(){
	game.initMaps();
	game.initSkins();
}, 1000 * 60);
