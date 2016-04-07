$(function(){
	socket = io();

	socket.on("login", function(data){
		client.pID = null;
		client.room = null;
		show("home");
	});

	socket.on("playerID", function(data){
		client.pID = data;
	});

	socket.on("playersStats", function(data){
		$("#onlinePlayers").text(data);
	});

	socket.on("rooms", function(data){
		client.display.displayRooms(data);
	})

	socket.on("init", function(data){
		client.initRoom(data);
	});

	socket.on("update", function(data){
		client.room.init(data);
	});

	socket.on("snapshot", function(data){
		client.onSnapshot(data);
	});

	socket.on("partipatingPlayer", function(data){
		data.player.room = client.room;
		var p = new Player(data.player);
		client.room.playingPlayers.push(p);
		client.room.mapPoll.push(data.map);
		client.display.mapPoll(client.room.mapPoll);
		client.display.addParticipatingPlayers(p, data.map);
	});

	socket.on("cooldownStart", function(data){
		client.room.endState = Date.now() + data;
	});

	socket.on("timer", function(data){
		console.log(data);
	});

	socket.on("ranking", function(data){
		console.log(data);
	});

	socket.on("msg", function(data){
		console.log(data);
		addMessage(data);
	});

	socket.on("newPlayer", function(data){
		var p = new Player(data);
		client.room.addPlayer(p);
		client.display.addPlayer(p);
		client.display.displayNbLobbyPlayers();
	});

	socket.on("deletePlayer", function(data){
		var p = new Player(data);
		client.room.deletePlayer(p);
		client.display.deletePlayer(p);
		client.display.displayNbLobbyPlayers();
	});
});