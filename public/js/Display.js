var Display = function(id, client){
	this.id = id;
	this.canvas = document.getElementById(this.id);
	this.ctx = this.canvas.getContext("2d");

	this.client = client;

	this.skins = {};
	this.maps = {};
}

Display.prototype.loadSkin = function(skin){
	var _this = this;
	if(!this.skins[skin.id]){
		skin.image = new Image();
		skin.image.src = "img/skins/"+skin.img;
		skin.image.onload = function(){
			_this.skins[skin.id] = skin;
		}
	}
}

Display.prototype.loadMap = function(map){
	var _this = this;
	var canvas = document.getElementById("roadCollision");
	var ctx = canvas.getContext("2d");
	if(!this.maps[map.id]){
		console.log("ok");
		map.decorOk = false;
		map.path = new Image();
		map.decor = new Image();
		map.path.src = "img/maps/paths/"+map.img;
		map.decor.src = "img/maps/decors/"+map.img;
		map.path.onload = function(){
			canvas.width = map.width;
			canvas.height = map.height;
			ctx.drawImage(map.path, 0, 0);
			_this.client.room.map.roadCanvasctx = ctx;
			_this.maps[map.id] = map;
		}
		map.decor.onload = function(){
			map.decorOk = true;
		}
	}else{
		map = this.maps[map.id];
		canvas.width = map.width;
		canvas.height = map.height;
		ctx.drawImage(map.path, 0, 0);
		_this.client.room.map.roadCanvasctx = ctx;
	}
}

Display.prototype.render = function(){
	var now = Date.now();
	if(this.client.room != null){
		var r = this.client.room;
		if(r.state == 1){
			//en course
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			var map = r.map;
			if(this.maps[map.id] && this.maps[map.id].decorOk){
				this.ctx.drawImage(this.maps[map.id].decor, 0, 0, map.width, map.height);
			}


			//Affichages checkpoints
			this.ctx.strokeStyle = "blue";
			for(var i in map.checkpoints){
				this.ctx.beginPath();
				this.ctx.arc(map.checkpoints[i].x, map.checkpoints[i].y, map.checkpoints[i].r, 0, 2*Math.PI);
				this.ctx.stroke();
			}

			//affichage fin
			this.ctx.fillStyle = "green";
			this.ctx.fillRect(map.finish.x, map.finish.y, map.finish.w, map.finish.h);

			for(var i in r.playingPlayers){
				var player = r.playingPlayers[i];
				var interp = INTERPOLATION;
				if(player.id == this.client.pID){
					interp = Math.ceil(1000/FPS);
				}
				var carData = player.getInterpolatePosition(now, interp);
				this.ctx.save();
				this.ctx.translate(carData.x, carData.y); 
				this.ctx.rotate(carData.rotation); 

				if(this.skins[player.skin.id]){
					var dx = Math.round(player.skin.rWidth/player.skin.width * player.skin.centerx);
					var dy = Math.round(player.skin.rHeight/player.skin.height * player.skin.centery);

					this.ctx.drawImage(this.skins[player.skin.id].image, player.skin.x, player.skin.y, player.skin.width, player.skin.height, -dx, -dy, player.skin.rWidth, player.skin.rHeight);
				}

				this.ctx.fillStyle = "blue";
				this.ctx.fillRect(-2, -2, 4, 4);
				

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
	var template = '{{#players}}<li><a href="#">{{pseudo}}</a> <span class="elo" style="float:right">{{elo}}</span></li>{{/players}}';
	var rendered = Mustache.render(template, {players:players});
  	$('#lobbyPlayers').html(rendered);
  	$("#nbPlayersLobby").text(players.length);
}

Display.prototype.displayRooms = function(rooms){
	var template = '{{#rooms}}<option value="{{id}}">Lobby #{{id}} ({{nbPlayer}} players)</option>{{/rooms}}';
	var rendered = Mustache.render(template, {rooms:rooms});
	$('#rooms').html(rendered);
}


Display.prototype.clearParticipatingPlayers = function(){
	$("#participatingPlayers").html("");
}

Display.prototype.addParticipatingPlayers = function(player, map){
	$("#participatingPlayers").append('<div>'+player.pseudo+' ('+map+')</div>');
}

Display.prototype.setSelectableMaps = function(maps){	
	maps.unshift({id:0, name:"Random", checked:true});
	console.log(maps);
	var template = '{{#maps}}<div><input type="radio" name="map" value="{{id}}" id="map-{{id}}" class="radio" {{#checked}}checked{{/checked}}/><label for="map-{{id}}">{{name}}</label></div>{{/maps}}';
	var rendered = Mustache.render(template, {maps:maps});
	$("#maps").html(rendered);
}

Display.prototype.setSelectableSkins = function(skins){	
	skins[0].checked = true;
	var template = '{{#skins}}<div><input type="radio" name="skin" value="{{id_us}}" id="skin-{{id_us}}" class="radio" {{#checked}}checked{{/checked}}/><label for="skin-{{id_us}}">{{name}}</label></div>{{/skins}}';
	var rendered = Mustache.render(template, {skins:skins});
	$("#skins").html(rendered);
}