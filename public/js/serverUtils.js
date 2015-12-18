var Utils = {};

//Réactions au événemments
Utils.onLogin = function(data, socket){
	//Si déjà connecté avec un compte
	var p = game.getPlayerBySocket(socket.id);
	if(p != null){
		Utils.onDisconnect(socket);
	}
	if(data.login && data.password){
		//Inscrit
		MysqlManager.getUserByConnection(data.login, crypto.createHash('sha256').update(data.password).digest("hex"), function(res){
			if(res != null){
				var d = {
					id:res.id,
					pseudo:res.pseudo,
					socket:socket.id,
					elo:res.elo,
					xp:res.xp,
					played:res.played,
					registered:true
				}
				p = new Player(d);

				game.addPlayer(p);
				socket.emit("playerID", p.id);
				var room = game.getAvailableRoom();
				room.addPlayer(p);

				MysqlManager.updateUser({online:1, connection_time:Math.floor(Date.now()/1000)}, p.id, function(){});
			}else{
				//mauvaise combinaison
			}
		});
	}else{
		//Guest
		if(data.login && isValidPseudo(data.login)){
			var used = false;
			for(var i in game.players){
				if(game.players[i].pseudo.toLowerCase() == data.login.toLowerCase()){
					var used = true;
					//deja pris
					break;
				}
			}
			if(!used){
				var d = {
					id:unPlayer.get() * -1,
					pseudo:"*"+data.login,
					socket:socket.id, 
					registered:false
				};
				p = new Player(d);

				game.addPlayer(p);
				socket.emit("playerID", p.id);
				var room = game.getAvailableRoom();
				room.addPlayer(p);
			}
		}else{
			//pseudo non valide
		}
	}
}

Utils.onSignin = function(data, socket){
	_this = this;
	if(data.login && data.password && data.password.length > 0 && isValidPseudo(data.login)){
		MysqlManager.getUserByPseudo(data.login, function(res){
			if(res == null){
				//Inscription
				var d = {
					pseudo:data.login,
					password:crypto.createHash('sha256').update(data.password).digest("hex"),
					elo:INIT_ELO,
					xp:0,
					played:0,
					registration_time:Math.floor(Date.now()/1000),
					connection_time:0,
					online:false
				}
				MysqlManager.addUser(d, function(){
					_this.onLogin(data);
				});
			}else{
				//Login utilisé
			}
		});
	}
}

Utils.onDisconnect = function(socket){
	var p = game.getPlayerBySocket(socket.id);
	if(!p){return;}
	if(p.room){
		p.room.deletePlayer(p);
	}
	if(p.registered){
		MysqlManager.updateUser({online:0, connection_time:Math.floor(Date.now()/1000)}, p.id, function(){});
	}else{
		unPlayer.free(p.id * -1);
	}
	game.deletePlayer(socket.id);
}

Utils.messageTo = function(socket, type, message){
	if(io.sockets.connected[socket]){
		io.sockets.connected[socket].emit(type, message);
	}
}