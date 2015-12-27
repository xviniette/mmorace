var Map = function(json){
	this.id;
	this.name;
	this.img;
	this.roadCanvasctx = null;

	this.mapPixels = [];

	this.nbLaps = 1;

	this.maxTime = 2 * 60 * 1000;	
	this.maxInterval = 20 * 1000;	

	this.width = 1000;
	this.height = 1000;

	this.checkpoints = [{x:100, y:100, r:50, nb:1}];
	this.maxCheckpoint = 0;
	this.finish = {
		x:0,
		y:0,
		w:50,
		h:50
	}

	this.start = {
		x:100, 
		y:100,
		rotation:0
	};

	this.init(json);
}

Map.prototype.isRoad = function(x, y){
	if(isServer){
		var index = (y*this.width + x) * 4
		return (this.mapPixels[index] == 255);
	}else{
		if(this.roadCanvasctx != null){
			var p = this.roadCanvasctx.getImageData(x, y, 1, 1).data;
			return (p[0] == 255);	
		}
		return true;
	}	
}

Map.prototype.pointInFinish = function(x, y){
	if(this.finish.x <= x && this.finish.x + this.finish.w >= x && this.finish.y <= y && this.finish.y + this.finish.h >= y){
		return true;
	}
	return false;
}

Map.prototype.parsing = function(){
	var _this = this;
	this.checkpoints = JSON.parse(this.checkpoints);
	var max = 0;
	for(var i in this.checkpoints){
		if(this.checkpoints[i].nb > max){
			max = this.checkpoints[i].nb;
		}
	}
	this.maxCheckpoint = max;

	this.finish = JSON.parse(this.finish);
	this.start = JSON.parse(this.start);

	if(isServer){
		PNG.decode('public/img/maps/paths/'+this.img, function(pixels) {
			_this.mapPixels = pixels;
		});
	}
}

Map.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}

Map.prototype.getInfos = function(){
	return {
		id:this.id,
		name:this.name,
		nbLaps:this.nbLaps,
		maxTime:this.maxTime,
		maxInterval:this.maxInterval,
		width:this.width,
		height:this.height,
		start:this.start,
		checkpoints:this.checkpoints,
		maxCheckpoint:this.maxCheckpoint,
		img:this.img,
		finish:this.finish
	}
}