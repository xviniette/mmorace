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
	}else{
		requete += "elo ";
	}

	if(desc == "desc"){
		requete += "DESC ";
	}else{
		requete += "ASC ";
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


//TEMPS

Mysql.prototype.addTemps = function(userid, raceid, time, callback){
	var data = {
		id_u:userid,
		id_r:raceid,
		timestamp:time
	}
	this.db.query("INSERT INTO times SET ?", data, function(e, r, f){
		callback();
	});
}

Mysql.prototype.getRankingMap = function(id, min, max, callback){
	var requete = "SELECT u.id, u.pseudo, u.elo, u.xp, u.played, u.online, t.timestamp, t.date FROM times t, users u WHERE u.id = t.id_u AND t.id_m = "+id+" ORDER BY t.timestamp ASC ";
	requete += "LIMIT "+min+", "+max+";";
	this.db.query(requete, function(e, r, f){
		callback(r);
	});
}

//MAP

Mysql.prototype.getMaps = function(callback){
	var requete = "SELECT * FROM maps;";
	this.db.query(requete, function(e, r, f){
		callback(r);
	});
}