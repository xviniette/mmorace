var Display = function(id, game){
	this.id = id;
	//this.canvas = document.getElementById(this.id);
	//this.ctx = this.canvas.getContext("2d");

	this.game = game;
}

Display.prototype.displayLobbyPlayers = function(players){
	var html = '<ul>';
	for(var i in players){
		html += '<li>'+players[i].pseudo+'</li>';
	}
	html += '</ul>';
}