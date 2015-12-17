var Display = function(id, game){
	this.id = id;
	//this.canvas = document.getElementById(this.id);
	//this.ctx = this.canvas.getContext("2d");

	this.game = game;
	this.nbLogKill = 0;

	this.middle = {};
	this.center = {};
}

Display.prototype.getRelativePosition = function(x, y){
	return {x:x + this.middle.x - this.center.x, y:y + this.middle.y - this.center.y};
}

Display.prototype.display = function(){
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.center = {x:Math.floor(this.game.room.limits.x/2), y:Math.floor(this.game.room.limits.y/2)};

	this.middle = {x:this.canvas.width/2, y:this.canvas.height/2};

	var players = this.game.room.players;
	for(var i in players){
		if(players[i].id == this.game.pID && players[i].alive){
			this.center = {x:players[i].body[0].x, y:players[i].body[0].y};
			break;			
		}
	}

	this.ctx.strokeStyle = "white";
	var pos = this.getRelativePosition(0, 0);
	this.ctx.lineWidth = 5;
	this.ctx.strokeRect(pos.x, pos.y, this.game.room.limits.x, this.game.room.limits.y);
	

	
	var apples = this.game.room.apples;

	this.ctx.lineWidth = 5;
	this.ctx.strokeStyle = "#FFBE00";

	for(var i in apples){
		this.ctx.beginPath();
		var pos = this.getRelativePosition(apples[i].x, apples[i].y);
		this.ctx.arc(pos.x, pos.y, apples[i].radius, 0, 2 * Math.PI, false);
		this.ctx.stroke();
	}

	this.ctx.font = '16px Arial';
	this.ctx.textAlign = 'center';

	for(var i in players){
		if(players[i].alive){
			var body = players[i].body;
			this.ctx.strokeStyle = players[i].color;
			this.ctx.fillStyle = players[i].color;
			for(var k = 0; k < 2; k++){
				if(k == 0){
					//Rond
					for(var j in body){
						this.ctx.lineWidth = 1;
						this.ctx.beginPath();
						var pos = this.getRelativePosition(body[j].x, body[j].y);
						this.ctx.arc(pos.x, pos.y, body[i].radius, 0, 2 * Math.PI, false);
						this.ctx.fill();
					}
				}else{
					//Lignes
					this.ctx.beginPath();
					this.ctx.lineCap = 'round';
					for(var j in body){
						this.ctx.lineWidth = body[j].radius*2;
						var pos = this.getRelativePosition(body[j].x, body[j].y);
						this.ctx.lineTo(pos.x, pos.y);
					}
					this.ctx.stroke();
				}
			}
			this.ctx.fillStyle = "white";
			var posPseudo = this.getRelativePosition(players[i].body[0].x, players[i].body[0].y - 20)
			var text = {pseudo:players[i].pseudo, x:posPseudo.x, y:posPseudo.y};
			this.ctx.fillText(text.pseudo, text.x, text.y);
		}
	}
	
}

Display.prototype.displayRooms = function(rooms){
	var html = '';
	for(var i in rooms){
		if(rooms[i].nbPlayer < rooms[i].nbMaxPlayer){
			html += '<option value="'+rooms[i].id+'" selected>#'+(parseInt(i)+1)+' ('+rooms[i].nbPlayer+'/'+rooms[i].nbMaxPlayer+' players)</option>';
		}else{
			html += '<option value="'+rooms[i].id+'">#'+(parseInt(i)+1)+' ('+rooms[i].nbPlayer+'/'+rooms[i].nbMaxPlayer+' players)</option>';
		}
	}
	$("#rooms").html(html);
}

Display.prototype.leaderBoard = function(){
	var playersRanking = [];
	var players = this.game.room.players;
	for(var i = 0; i < players.length; i++){
		if(players[i].alive){
			for(var j = 0; j < playersRanking.length; j++){
				if(players[i].score > playersRanking[j].score){
					break;
				}
			}
			playersRanking.splice(j, 0, players[i]);
		}
	}
	var html = '<ul>';
	for(var i in playersRanking){
		html += '<li>'+(parseInt(i)+1)+'. '+playersRanking[i].pseudo+' : '+playersRanking[i].score+'</li>';
	}
	html += '</ul>';
	$("#leaderboard").html(html);
}

Display.prototype.killLog = function(data){
	var killer = "";
	var killed = "";
	for(var i in this.game.room.players){
		if(this.game.room.players[i].id == data.killer){
			killer = this.game.room.players[i].pseudo;
		}
		if(this.game.room.players[i].id == data.killed){
			killed = this.game.room.players[i].pseudo;
		}
	}
	var html = '<li id="kill-'+this.nbLogKill+'">'+killer+' has killed '+killed+'</li>';
	$("#killLogs").append(html);
	var nb = this.nbLogKill;
	setTimeout(function(){
		document.getElementById("kill-"+nb).remove();
	}, 3000);
	this.nbLogKill++;
}

Display.prototype.displayScore = function(score){
	$("#myScore").text("Score : "+score);
}