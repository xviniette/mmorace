var Player = function(json){
	this.room;

	this.id;
	this.socket;
	this.pseudo;
	this.elo = 0;
	this.xp = 0;
	this.played = 0;
	this.registered = false;

	this.deltaElo = 0;
	this.totalEloCompare = 0;

	this.time = null;
	this.positions = [];

	this.inputs = [];
	this.nbInputs = 0;
	this.nbInputsToExecute = 0;

	this.car;

	this.init(json);
}

Player.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}

Player.prototype.update = function(){
	this.nbInputsToExecute++;
	var j = 0;
	for(var i = 0; i < this.nbInputsToExecute; i++){
		if(i < this.inputs.length){
			this.nbInputs++;
			this.car.update(this.inputs[i]);
			this.nbInputsToExecute--;
			j++;
		}else{
			break;
		}
	}
	this.inputs.splice(0, j);
}

Player.prototype.getTimer = function(){
	return Math.round(this.room.deltaTime * this.nbInputs);
}

Player.prototype.spawn = function(map){
	this.car = new Car();
	this.car.x = map.start.x;
	this.car.y = map.start.y;
	this.car.carDir = map.start.rotation;
}

Player.prototype.clear = function(){
	this.deltaElo = 0;
	this.totalEloCompare = 0;
	this.time = null;
	this.inputs = [];
	this.nbInputs = 0;
	this.nbInputsToExecute = 0;
}

Player.prototype.getInit = function(){
	var data = {
		id:this.id,
		pseudo:this.pseudo,
		elo:this.elo,
		xp:this.xp,
		played:this.played,
		registered:this.registered
	}
	if(this.car != null){
		data.car = {
			x:Math.round(this.car.x),
			y:Math.round(this.car.y),
			rotation:Math.round(radtodeg(this.car.rotation))
		}
	}
	return data;
}

Player.prototype.getSnapshot = function(){
	if(this.car != null){
		return {
			id:this.id,
			x:Math.round(this.car.x),
			y:Math.round(this.car.y),
			rotation:Math.round(radtodeg(this.car.rotation))
		}
	}
	return null;
}