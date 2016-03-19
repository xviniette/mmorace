var Mysql = function(db){
	this.db = db;
}

//USER
Mysql.prototype.getUserById = function(id, callback){
	this.db.query("SELECT * FROM users WHERE id = ?;", [id], function(e, r, f){
		if(r.length == 0){
			callback(null);
		}else{
			callback(r[0]);
		}
	});
}

Mysql.prototype.getUserByPseudo = function(pseudo, callback){
	this.db.query("SELECT * FROM users WHERE pseudo = ?;", [pseudo], function(e, r, f){
		if(r.length == 0){
			callback(null);
		}else{
			callback(r[0]);
		}
	});
}

Mysql.prototype.getUserByConnection = function(pseudo, password, callback){
	this.db.query("SELECT * FROM users WHERE pseudo = ? && password = ?;", [pseudo, password], function(e, r, f){
		if(r.length == 0){
			callback(null);
		}else{
			callback(r[0]);
		}
	});
}

Mysql.prototype.addUser = function(dataUser, callback){
	this.db.query("INSERT INTO users SET ?", dataUser, function(e, r, f){
		callback();
	});
}

Mysql.prototype.updateUser = function(dataUser, id, callback){
	this.db.query("UPDATE users SET ? WHERE ?", [dataUser, {id:id}], function(e, r, f){
		callback();
	});
}

Mysql.prototype.everybodyOffline = function(){
	var dataUser = {online:0};
	this.db.query("UPDATE users SET ?;", [dataUser], function(e, r, f){});
}


Mysql.prototype.getRanking = function(type, desc, min, max, callback){
	var requete = "SELECT id, pseudo, elo, xp, played, online, registration_time, connection_time FROM users ORDER BY ";
	if(type == "xp"){
		requete += "xp ";
	}else if(type == "played"){
		requete += "played ";
	}else{
		requete += "elo ";
	}

	if(desc == "asc"){
		requete += "ASC ";
	}else{
		requete += "DESC ";
	}

	requete += "LIMIT "+min+", "+max+";";
	this.db.query(requete, function(e, r, f){
		callback(r);
	});
}

//Race

Mysql.prototype.addRace = function(mapid, callback){
	var data = {
		id_m:mapid,
		date:Math.floor(Date.now()/1000)
	}
	this.db.query("INSERT INTO races SET ?", data, function(e, r, f){
		callback(r.insertId);
	});
}

Mysql.prototype.getRace = function(id, callback){
	this.db.query("SELECT r.id, r.id_m, r.date, m.name, m.img FROM races r, maps m WHERE r.id = ? AND m.id = r.id_m;", [id], function(e, r, f){
		if(r.length == 0){
			callback(null);
		}else{
			callback(r[0]);
		}
	});
}

Mysql.prototype.getTemps = function(id, callback){
	this.db.query("SELECT u.id, t.timestamp, u.pseudo, t.oldElo, t.deltaElo FROM times t, users u WHERE t.id_r = ? AND t.id_u = u.id ORDER BY t.timestamp ASC;", [id], function(e, r, f){
		callback(r);
	});
}


//TEMPS

Mysql.prototype.addTemps = function(userid, raceid, time, elo, deltaelo, callback){
	var data = {
		id_u:userid,
		id_r:raceid,
		timestamp:time,
		oldElo:elo,
		deltaElo:deltaelo
	}
	this.db.query("INSERT INTO times SET ?", data, function(e, r, f){
		callback();
	});
}

Mysql.prototype.getRankingMap = function(id, min, max, callback){
	var requete = "SELECT u.id, u.pseudo, u.elo, u.xp, u.online, t.timestamp FROM times t, races r, users u WHERE t.id_r = r.id AND r.id_m = ? AND t.id_u = u.id AND t.timestamp != -1 ORDER BY t.timestamp ASC;";
	this.db.query(requete, [id, min, max], function(e, r, f){
		callback(r);
	});
}

//MAP

Mysql.prototype.getTempsPlayerMap = function(iduser, idmap, min, max, callback){
	this.db.query("SELECT t.timestamp, r.date, r.id_m FROM times t, races r WHERE t.timestamp != -1 AND t.id_u = ? AND r.id = t.id_r AND r.id_m = ? ORDER BY t.timestamp ASC LIMIT ?, ?;", [iduser, idmap, min, max], function(e, r, f){
		callback(r);
	});
}

Mysql.prototype.getMapFinishedByUser = function(iduser, callback){
	this.db.query("SELECT DISTINCT m.id, m.name, m.img FROM maps m, times t, races r WHERE r.id_m = m.id AND r.id = t.id_r AND t.id_u = ?;", [iduser], function(e, r, f){
		callback(r);
	});
}

Mysql.prototype.getMap = function(id, callback){
	this.db.query("SELECT * FROM maps WHERE id = ?;", [id], function(e, r, f){
		if(r.length == 0){
			callback(null);
		}else{
			callback(r[0]);
		}
	});
}

Mysql.prototype.getMaps = function(callback){
	var requete = "SELECT * FROM maps;";
	this.db.query(requete, function(e, r, f){
		callback(r);
	});
}

//SKINS

Mysql.prototype.getSkins = function(callback){
	var requete = "SELECT * FROM skins ORDER BY rarity ASC;";
	this.db.query(requete, function(e, r, f){
		callback(r);
	});
}

Mysql.prototype.getUserSkins = function(id, callback){
	var requete = "SELECT *, us.id as id_us, id_s as id FROM skins s, userskin us WHERE s.id = us.id_s AND us.id_u = ?;";
	this.db.query(requete, [id], function(e, r, f){
		callback(r);
	});
}

Mysql.prototype.addUserSkin = function(player, skin, callback){
	var data = {
		id_u:player.id,
		id_s:skin.id,
		soldPrice:0,
	}
	this.db.query("INSERT INTO userskin SET ?", data, function(e, r, f){
		callback();
	});
}

//CASES
Mysql.prototype.getUserCases = function(id, callback){
	var requete = "SELECT *, uc.id as id_uc, uc.id_c as id FROM cases c, usercase uc WHERE c.id = uc.id_c AND uc.id_u = ?;";
	this.db.query(requete, [id], function(e, r, f){
		callback(r);
	});
}

Mysql.prototype.addUserCase = function(player, skin, callback){
	var data = {
		id_u:player.id,
		id_c:skin.id,
		soldPrice:0,
	}
	this.db.query("INSERT INTO usercase SET ?", data, function(e, r, f){
		callback();
	});
}