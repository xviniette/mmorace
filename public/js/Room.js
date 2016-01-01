var Room = function(json){
	this.id;

	this.players = [];
	this.playingPlayers = [];

	this.mapPoll = [];
	this.selectableMaps = [];

	this.map = null;
	this.mapPixels = [];

	this.state = 0; 
	//0 : participer
	//1 : course
	this.endState = null;
	this.startRace = null;
	

	//FPS PHYSIQUE
	this.fps = FPS;
	this.deltaTime = 1/this.fps;
	this.lastFrame = Date.now();

	//RESEAU
	this.newtorkfps = FPSNETWORK;
	this.newtorkdeltaTime = 1/this.newtorkfps;
	this.newtorklastFrame = Date.now();

	this.init(json);
	this.getMaps();
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
	this.endState = null;
	this.startRace = null;
	this.map = null;

	this.getMaps();	
}

Room.prototype.getMaps = function(){
	if(isServer){
		this.selectableMaps = [];
		var nb = (NB_PROPOSITION_MAP > game.maps.length) ? game.maps.length : NB_PROPOSITION_MAP;
		
		while(this.selectableMaps.length < nb){
			var mapSelected = game.maps[random(0, game.maps.length - 1)];
			var toAdd = true;
			for(var i in this.selectableMaps){
				if(this.selectableMaps[i].id == mapSelected.id){
					toAdd = false;
					break;
				}
			}
			if(toAdd){
				this.selectableMaps.push(mapSelected);
			}
		}
	}
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
			var mapIn = false;
			for(var i in this.selectableMaps){
				if(this.selectableMaps[i].id == map){
					mapIn = true;
				}
			}
			if(mapIn){
				this.mapPoll.push(map);
			}else{
				this.mapPoll.push(0);
			}
			//Ajout joueur
			//On attribue le skin
			player.skin = game.skins[0];
			this.playingPlayers.push(player);
			if(isServer){
				//On prévient tout le monde du nouveau joueur
				for(var i in this.players){
					Utils.messageTo(this.players[i].socket, "partipatingPlayer", {player:player.getInit(), map:map});
				}
				if(this.endState == null){
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

Room.prototype.startingRace = function(){
	var _this = this;
	var map = this.mapPoll[random(0, this.mapPoll.length-1)];
	this.map = null;
	for(var i in this.selectableMaps){
		if(this.selectableMaps[i].id == map){
			this.map = this.selectableMaps[i];
			break;
		}
	}

	if(this.map == null){
		this.map = game.maps[random(0, game.maps.length - 1)];
	}


	this.state = 1;
	this.startRace = STARTTIME + Date.now();
	this.endState = this.startRace + this.map.maxTime;
	for(var i in this.playingPlayers){
		this.playingPlayers[i].clear();
		this.playingPlayers[i].spawn(this.map);
	}

	var initInfos = this.getInitInfo();
	delete initInfos.players;
	delete initInfos.selectableMaps;
	delete initInfos.mapPoll;

	for(var i in this.players){
		Utils.messageTo(this.players[i].socket, "update", initInfos);
	}
}

Room.prototype.endRace = function(){
	this.state = 0;
	this.endState = null;
	this.startRace = null;

	//CALCUL ELO
	var _this = this;
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

	var ranking = {};
	ranking.drops = [];
	ranking.players = [];
	for(var i in this.playingPlayers){
		//DROPS
		if(this.playingPlayers[i].registered && this.playingPlayers[i].time != null){
			//skin
			if(this.playingPlayers[i].nbskintodrop > 0){
				if(this.playingPlayers[i].skindropin <= 0){
					//drop de skin
					console.log("drop");
					this.playingPlayers[i].nbskintodrop--;
					this.playingPlayers[i].skindropin = randomNormalized(SKINS_DROP.n, SKINS_DROP.center, SKINS_DROP.bornes);
				}else{
					//on décompte
					this.playingPlayers[i].skindropin--;
				}
			}
			//caisse
			if(this.playingPlayers[i].nbcasetodrop > 0){
				if(this.playingPlayers[i].casedropin <= 0){
					//drop de caisse
					console.log("drop");
					this.playingPlayers[i].nbcasetodrop--;
					this.playingPlayers[i].casedropin = randomNormalized(CASES_DROP.n, CASES_DROP.center, CASES_DROP.bornes);
				}else{
					//on décompte
					this.playingPlayers[i].casedropin--;
				}
			}
		}
		//classement
		if(this.playingPlayers[i].registered && this.playingPlayers[i].totalEloCompare > 0){
			this.playingPlayers[i].deltaElo = Math.round(Elo.getK(this.playingPlayers[i].elo) * this.playingPlayers[i].deltaElo/this.playingPlayers[i].totalEloCompare);
		}else{
			this.playingPlayers[i].deltaElo = 0;
		}
		if(this.playingPlayers[i].time == null){
			this.playingPlayers[i].time = -1;
		}
		ranking.players.push(this.playingPlayers[i].getRankingInfo());
	}

	ranking.players = orderBy(ranking.players, "time", false);

	//On envoit le classement a tout le monde
	for(var i in this.players){
		Utils.messageTo(this.players[i].socket, "ranking", ranking);
	}

	//On crée la race database
	MysqlManager.addRace(this.map.id, function(raceId){
		for(var i in _this.playingPlayers){
			if(_this.playingPlayers[i].registered){
				MysqlManager.addTemps(_this.playingPlayers[i].id, raceId, (_this.playingPlayers[i].time == null) ? -1 : _this.playingPlayers[i].time, _this.playingPlayers[i].elo, _this.playingPlayers[i].deltaElo, function(){});
				
				_this.playingPlayers[i].elo += _this.playingPlayers[i].deltaElo;
				_this.playingPlayers[i].played++;
				var updateuserdata = {
					elo:_this.playingPlayers[i].elo, 
					played:_this.playingPlayers[i].played,
					nbskintodrop:_this.playingPlayers[i].nbskintodrop,
					nbcasetodrop:_this.playingPlayers[i].nbcasetodrop,
					skindropin:_this.playingPlayers[i].skindropin,
					casedropin:_this.playingPlayers[i].casedropin
				};

				MysqlManager.updateUser(updateuserdata, _this.playingPlayers[i].id, function(){});
			}
		}
		_this.clear();
		var initMessage = _this.getInitInfo();
		delete initMessage.players;

		for(var i in _this.players){
			Utils.messageTo(_this.players[i].socket, "update", initMessage);
		}
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
		if(this.state == 1){
			var snapshot = this.getSnapshot();
			for(var i in this.players){
				Utils.messageTo(this.players[i].socket, "snapshot", snapshot);
			}
		}
		this.newtorklastFrame += d;
	}
}

Room.prototype.allPlayersFinish = function(){
	for(var i in this.playingPlayers){
		if(this.playingPlayers[i].time == null){
			return false;
		}
	}
	return true;
}

Room.prototype.serverLogic = function(){
	var now = Date.now();
	if(this.state == 1){
		//course
		//Si fin de course (Temps dépassé ou tout le monde a fini)
		for(var i in this.playingPlayers){
			this.playingPlayers[i].update();
		}
		if(this.endState < now || this.allPlayersFinish()){
			this.endRace();
		}
	}else{
		//preparation
		if(this.endState != null && this.endState < now){
			//On lance le début de la course
			this.startingRace();
		}
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
	return ps;
}

Room.prototype.getInitInfo = function(){
	var data = {
		id:this.id,
		state:this.state,
		endState:(this.endState == null) ? null : this.endState - Date.now(),
		startRace:(this.startRace == null) ? null : this.startRace - Date.now(),
		mapPoll:this.mapPoll,
	};

	data.selectableMaps = [];
	for(var i in this.selectableMaps){
		data.selectableMaps.push(this.selectableMaps[i].getInfos());
	}

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