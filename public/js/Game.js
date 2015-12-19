var Game = function(){
	this.players = {};
	this.rooms = [];

	this.maps = [];
}

Game.prototype.initMaps = function(){
	_this = this;
	MysqlManager.getMaps(function(res){
		for(var i in res){
			var m = new Map(res[i]);
			m.parsing();
			_this.maps.push(m);
		}
	});
}

Game.prototype.update = function(){
	for(var i in this.rooms){
		this.rooms[i].update();
	}
}

Game.prototype.addPlayer = function(player){
	this.players[player.socket] = player;
}

Game.prototype.deletePlayer = function(socket){
	delete this.players[socket];
}

Game.prototype.newRoom = function(){
	var r = new Room({id:unRoom.get()});
	this.rooms.push(r);
	return r;
}

Game.prototype.deleteRoom = function(roomId){
	for(var i in this.rooms){
		if(this.rooms[i].id == roomId){
			unRoom.free(roomId);
			this.rooms.splice(i, 1);
		}
	}
}

Game.prototype.getAvailableRoom = function(){
	if(this.rooms.length == 0){
		this.newRoom();
	}

	for(var i in this.rooms){
		if(this.rooms[i].players.length <= 1000){
			return this.rooms[i];
		}
	}
}

Game.prototype.getPlayerBySocket = function(socket){
	if(this.players[socket]){
		return this.players[socket];
	}
	return null;
}

Game.prototype.getPlayerById = function(id){
	for(var i in this.players){
		if(this.players[i].id == id){
			return this.players[i];
		}
	}
	return null;
}

Game.prototype.getRoom = function(id){
	for(var i in this.rooms){
		if(this.rooms[i].id == id){
			return this.rooms[i];
		}
	}
	return null;
}

Game.prototype.getRoomsList = function(){
	if(this.getNbPlayers() > this.rooms.length * MAXPLAYER){
		this.newRoom();
	}
	var d = [];
	for(var i in this.rooms){
		d.push(this.rooms[i].getListInfo());
	}
	return d;
}

Game.prototype.getNbPlayers = function(){
	return Object.keys(this.players).length;
}