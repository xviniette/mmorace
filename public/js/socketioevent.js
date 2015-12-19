$(function(){
	socket = io();

	socket.on("login", function(data){
		client.pID = null;
		client.room = null;
	});

	socket.on("playerID", function(data){
		client.pID = data;
	});

	socket.on("playersStats", function(data){
		console.log(data);
	});

	socket.on("init", function(data){
		client.initRoom(data);
	});

	socket.on("partipatingPlayer", function(data){
		data.player.room = client.room;
		client.room.playingPlayers.push(new Player(data.player));
		client.room.mapPoll.push(data.map);
	});

	socket.on("cooldownStart", function(data){
		client.room.endState = Date.now() + data;
	});

	socket.on("newPlayer", function(data){
		client.room.addPlayer(new Player(data));
	});

	socket.on("deletePlayer", function(data){
		client.room.deletePlayer(new Player(data));
	});
});