var Display = function(id, client){
	this.id = id;
	this.canvas = document.getElementById(this.id);
	this.ctx = this.canvas.getContext("2d");

	this.client = client;
}

Display.prototype.render = function(){
	if(this.client.room != null){
		var r = this.client.room;
		if(r.state == 1){
			//en course
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			for(var i in r.playingPlayers){
				var player = r.playingPlayers[i];
				var car = player.car;
				this.ctx.save();
				this.ctx.translate(car.x, car.y); 
				this.ctx.rotate(car.rotation); 

				var largeur = 40;
				var longueur = 20;
				this.ctx.fillStyle = "black";
				this.ctx.fillRect(-largeur/2, -longueur/2, largeur, longueur);
				this.ctx.fillStyle = "red";
				var largD = largeur/4;
				var longD = longueur;
				this.ctx.fillRect(largeur/2-largD, -longueur/2, largD, longueur);

				this.ctx.restore();
			}
		}
	}
}

Display.prototype.displayCooldown = function(cd){
	if(cd == null){
		$("#cooldown").html("NULL");
	}else{
		$("#cooldown").html(cd - Date.now());
	}
}

Display.prototype.displayLobbyPlayers = function(players){
	var html = '<ul>';
	for(var i in players){
		html += '<li>'+players[i].pseudo+' ('+players[i].elo+')</li>';
	}
	html += '</ul>';
	$("#lobbyPlayers").html(html);
}

Display.prototype.clearParticipatingPlayers = function(){
	$("#participatingPlayers").html("");
}

Display.prototype.addParticipatingPlayers = function(player, map){
	$("#participatingPlayers").append('<div>'+player.pseudo+' ('+map+')</div>');
}

Display.prototype.setSelectableMaps = function(maps){	
	var html = '<option value="0">Random</option>';
	for(var i in maps){
		html += '<option value="'+maps[i].id+'">'+maps[i].name+'</option>';
	}
	$("#participate_map").html(html);
}