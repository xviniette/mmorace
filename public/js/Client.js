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
		this.lastFrame += d;
	}
}

Client.prototype.initRoom = function(data){
	this.room = new Room(data);
	this.room.players = [];
	this.room.playingPlayers = [];
	for(var i in data.players){
		data.players[i].room = this.room;
		this.room.players.push(new Player(data.players[i]));
	}

	for(var i in data.playingPlayers){
		data.playingPlayers[i].room = this.room;
		this.room.playingPlayers.push(new Player(data.playingPlayers[i]));
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