var Room = function(json){
	this.id;

	this.players = [];
	this.playingPlayers = [];

	this.mapPoll = [];

	this.map = null;

	this.state = 0; 
	//0 : participer
	//1 : course
	this.endState = 0;
	this.startRace = 0;
	

	//FPS PHYSIQUE
	this.fps = FPS;
	this.deltaTime = 1/this.fps;
	this.lastFrame = Date.now();

	//RESEAU
	this.newtorkfps = FPSNETWORK;
	this.newtorkdeltaTime = 1/this.newtorkfps;
	this.newtorklastFrame = Date.now();

	this.init(json);
}

Room.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}

Room.prototype.clear = function(){
	this.playingPlayers = [];
	this.mapPoll = [];
	this.state = 0;
	this.endState = 0;
}

Room.prototype.participate = function(player, map){
	if(this.state == 0){
		var alreadyIn = false;
		for(var i in this.playingPlayers){
			if(this.playingPlayers[i].id == player.id){
				alreadyIn = true;
				break;
			}
		}
		if(!alreadyIn){
			this.mapPoll.push(map);
			this.playingPlayers.push(player);
			if(isServer){
				//On prévient tout le monde du nouveau joueur
				for(var i in this.players){
					Utils.messageTo(this.players[i].socket, "partipatingPlayer", {player:player.getInit(), map:map});
				}
				if(this.endState == 0){
					this.endState = Date.now() + PREPARATIONTIME;
					//Envoi message compte à rebour
					for(var i in this.players){
						Utils.messageTo(this.players[i].socket, "cooldownStart", this.endState - Date.now());
					}
				}
			}
		}
	}
}

Room.prototype.startRace = function(){
	var map = this.mapPoll[random(0, this.mapPoll.length-1)];
	this.state = 1;
	this.startRace = STARTTIME + Date.now();
	this.endState = this.startRace + 2 * 60 * 1000;
	for(var i in this.playingPlayers){
		this.playingPlayers[i].clear();
		this.playingPlayers[i].spawn(map);
	}
}


Room.prototype.endRace = function(){
	//CALCUL ELO
	for(var i = 0; i < this.playingPlayers.length; i++){
		for(var j = i + 1; j < this.playingPlayers.length; j++){
			if(this.playingPlayers[i].registered && this.playingPlayers[j].registered){
				var dElo = null;
				if(this.playingPlayers[i].time != null && this.playingPlayers[j].time != null){
					if(this.playingPlayers[i].time < this.playingPlayers[j].time){
						dElo = Elo.calc(this.playingPlayers[i].elo, this.playingPlayers[j].elo, 1);
					}else{
						dElo = Elo.calc(this.playingPlayers[i].elo, this.playingPlayers[j].elo, 0);
					}
				}else if(this.playingPlayers[i].time == null && this.playingPlayers[j].time != null){
					dElo = Elo.calc(this.playingPlayers[i].elo, this.playingPlayers[j].elo, 0);
				}else if(this.playingPlayers[i].time != null && this.playingPlayers[j].time == null){
					dElo = Elo.calc(this.playingPlayers[i].elo, this.playingPlayers[j].elo, 1);
				}

				if(dElo != null){
					this.playingPlayers[i].deltaElo += dElo.elo1;
					this.playingPlayers[i].totalEloCompare++;
					this.playingPlayers[j].deltaElo += dElo.elo2;
					this.playingPlayers[j].totalEloCompare++;
				}
			}

		}
	}

	//On crée la race
	MysqlManager.addRace(this.map.id, function(raceId){
		for(var i in this.playingPlayers){
			if(this.playingPlayers[i].registered){
				this.playingPlayers[i].played++;
				if(this.playingPlayers[i].totalEloCompare > 0){
					this.playingPlayers[i].elo += Math.round(Elo.getK(this.playingPlayers[i].elo) * this.playingPlayers[i].deltaElo/this.playingPlayers[i].totalEloCompare);
				}

				MysqlManager.updateUser({elo:this.playingPlayers[i].elo, played:this.playingPlayers[i].played}, p.id, function(){});
				if(this.playingPlayers[i].time != null){
					MysqlManager.addTemps(this.playingPlayers[i].id, raceId, this.playingPlayers[i].time, function(){});
				}
			}
		}
		this.clear();
	});
}

Room.prototype.update = function(){
	var now = Date.now();
	//JEU
	var d = this.deltaTime * 1000;
	while(now - this.lastFrame >= d){
		this.serverLogic();
		this.lastFrame += d;
	}

	//RESEAU
	var d = this.newtorkdeltaTime * 1000;
	while(now - this.newtorklastFrame >= d){
		this.newtorklastFrame += d;
	}
}

Room.prototype.serverLogic = function(){
	if(this.state == 1){
		//course
	}else{
		//preparation
	}
}

Room.prototype.addPlayer = function(p){
	var toAdd = true;
	for(var i in this.players){
		if(this.players[i].id == p.id){
			toAdd = false;
			break;
		}
	}
	if(isServer){
		if(toAdd){
			p.room = this;
			for(var i in this.players){
				Utils.messageTo(this.players[i].socket, "newPlayer", p.getInit());
			}
			this.players.push(p);
			Utils.messageTo(p.socket, "init", this.getInitInfo());
		}
	}else{
		if(toAdd){
			this.players.push(p);
		}
	}
}

Room.prototype.deletePlayer = function(p){
	var del = false;
	for(var i in this.players){
		if(this.players[i].id == p.id){
			this.players.splice(i, 1);
			del = true;
		}
	}
	if(isServer){
		if(del){
			p.room = null;
			for(var i in this.players){
				Utils.messageTo(this.players[i].socket, "deletePlayer", {id:p.id});
			}
		}
		if(this.players.length == 0){
			game.deleteRoom(this.id);
		}
	}
	return del;
}

Room.prototype.getQuickInfo = function(){
	return {
		id:this.id,
		nbPlayer:this.players.length
	};
}

Room.prototype.getSnapshot = function(){
	var ps = [];
	for(var i in this.playingPlayers){
		ps.push(this.playingPlayers[i].getSnapshot());
	}
}

Room.prototype.getInitInfo = function(){
	var data = {
		id:this.id,
		state:this.state,
		endState:this.endState - Date.now(),
		startRace:this.startRace - Date.now(),
		mapPoll:this.mapPoll
	};

	data.players = [];
	for(var i in this.players){
		data.players.push(this.players[i].getInit());
	}

	data.playingPlayers = [];
	for(var i in this.playingPlayers){
		data.playingPlayers.push(this.playingPlayers[i].getInit());
	}
	if(this.map != null){
		data.map = this.map.getInfos();
	}
	return data;
}