var Display = function(id, game){
	this.id = id;
	//this.canvas = document.getElementById(this.id);
	//this.ctx = this.canvas.getContext("2d");

	this.game = game;
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
	console.log(html);
	$("#participate_map").html(html);
}