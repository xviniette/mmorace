var Client = function(){
	this.pID;
	this.ping = 0;
	this.display = new Display("canvas", this);

	this.keys = {};

	this.fps = FPS;
	this.deltaTime = 1/this.fps;
	this.lastFrame = Date.now();

	this.room;
}

Client.prototype.update = function(){
	var now = Date.now();
	var d = this.deltaTime * 1000;
	while(now - this.lastFrame >= d){
		//update
		if(this.room){
			if(this.room.state == 1 && this.room.startRace <= now){
				//Si course en cours et qui a démarré
				for(var i in this.room.playingPlayers){
					//On cherche son joueur
					if(this.room.playingPlayers[i].id == this.pID){
						socket.emit("inputs", this.keys);
						this.room.playingPlayers[i].inputs = [this.keys];
						this.room.playingPlayers[i].update();
						var data = this.room.playingPlayers[i].getSnapshot();
						data.t = now;
						data.rotation = degtorad(data.rotation);
						this.room.playingPlayers[i].positions.push(data);
						break;
					}
				}

			}
		}
		this.lastFrame += d;
	}
	this.updateDisplay();
}

Client.prototype.updateDisplay = function(){
	if(this.room != null){
		this.display.displayCooldown(this.room.endState);
		if(this.room.state == 1){
			this.display.render();
		}
	}	
}

Client.prototype.initRoom = function(data){
	this.room = new Room(data);
	this.room.players = [];
	this.room.playingPlayers = [];

	if(data.map){
		this.room.map = new Map(data.map);
		this.display.loadRoadCollision();
	}

	for(var i in data.players){
		data.players[i].room = this.room;
		this.room.players.push(new Player(data.players[i]));
	}

	for(var i in data.playingPlayers){
		data.playingPlayers[i].room = this.room;
		var pp = new Player(data.playingPlayers[i]);
		if(data.playingPlayers[i].car){
			data.playingPlayers[i].car.player = pp;
			pp.car = new Car(data.playingPlayers[i].car);
		}
		this.room.playingPlayers.push(pp);
	}
}

Client.prototype.onSnapshot = function(data){
	var now = Date.now();
	if(this.room == null){
		return false;
	}
	for(var i in data){
		for(var j in this.room.playingPlayers){
			var p = this.room.playingPlayers[j];
			if(p.id == data[i].id && p.id != this.pID){
				//Récupération des données et non moi
				data[i].t = now;
				data[i].rotation = degtorad(data[i].rotation);
				p.positions.push(data[i]);
			}
		}
	}
}

Client.prototype.loadImages = function(sources, callback){
	var _this = this;
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	if(sources == null){
		callback();
	}
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				_this.display.images = images;
				callback();
			}
		};
		images[src].src = sources[src];
	}
}