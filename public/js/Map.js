var Map = function(json){
	this.id;
	this.name;

	this.nbLaps = 1;

	this.maxTime = 2 * 60 * 1000;	
	this.maxInterval = 20 * 1000;	

	this.width = 1000;
	this.height = 1000;

	this.track = [[]];
	this.checkpoints = [{x:100, y:100, r:50, nb:1}];
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

Map.prototype.pointInFinish = function(x, y){
	if(this.finish.x <= x && this.finish.x + this.finish.w >= x && this.finish.y <= y && this.finish.h + this.finish.w >= y){
		return true;
	}
	return false;
}

Map.prototype.parsing = function(){
	this.track = JSON.parse(this.track);
	this.checkpoints = JSON.parse(this.checkpoints);
	this.finish = JSON.parse(this.finish);
	this.start = JSON.parse(this.start);
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
		track:this.track,
		finish:this.finish
	}
}