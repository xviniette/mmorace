var Client = function(){
	this.pID;
	this.ping = 0;
	this.display = new Display("canvas", this);

	this.keys = {};

	this.lastFrame = Date.now();

	this.room;
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