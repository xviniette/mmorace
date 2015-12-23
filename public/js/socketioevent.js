$(function(){
	socket = io();

	socket.on("login", function(data){
		client.pID = null;
		client.room = null;
		$("#ConnectionPanel").show();
	});

	socket.on("playerID", function(data){
		client.pID = data;
		$("#ConnectionPanel").hide();
	});

	socket.on("playersStats", function(data){
	});

	socket.on("init", function(data){
		if(data.endState != null){
			data.endState = Date.now() + data.endState;
		}
		if(data.startRace != null){
			data.startRace = Date.now() + data.startRace;
		}
		client.initRoom(data);
		client.display.displayLobbyPlayers(client.room.players);
		client.display.clearParticipatingPlayers();
		for(var i = 0; i < client.room.playingPlayers.length; i++){
			client.display.addParticipatingPlayers(client.room.playingPlayers[i], client.room.mapPoll[i]);
		}
		client.display.setSelectableMaps(client.room.selectableMaps);
	});

	socket.on("snapshot", function(data){
		client.onSnapshot(data);
	});

	socket.on("partipatingPlayer", function(data){
		data.player.room = client.room;
		var p = new Player(data.player);
		client.room.playingPlayers.push(p);
		client.room.mapPoll.push(data.map);
		client.display.addParticipatingPlayers(p, data.map);
	});

	socket.on("cooldownStart", function(data){
		client.room.endState = Date.now() + data;
	});

	socket.on("timer", function(data){
		console.log(data);
	});


	socket.on("newPlayer", function(data){
		client.room.addPlayer(new Player(data));
		client.display.displayLobbyPlayers(client.room.players);
	});

	socket.on("deletePlayer", function(data){
		client.room.deletePlayer(new Player(data));
		client.display.displayLobbyPlayers(client.room.players);
	});
});