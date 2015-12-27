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

	this.lastTchatMessage = 0;

	this.car;

	this.skin;

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

Player.prototype.getInterpolatePosition = function(t, interp){
	var data = null;
	for(var i = 0; i < this.positions.length - 1; i++){
		data = {};
		if(this.positions[i].t <= t - interp && this.positions[i+1].t > t - interp){
			var ratio = ((t - interp)-this.positions[i].t)/(this.positions[i+1].t - this.positions[i].t);
			data.x = this.positions[i].x + ratio * (this.positions[i+1].x - this.positions[i].x);
			data.y = this.positions[i].y + ratio * (this.positions[i+1].y - this.positions[i].y);
			data.rotation = this.positions[i].rotation + ratio * (this.positions[i+1].rotation - this.positions[i].rotation);
			return data;
		}
	}

	if(this.positions.length > 0){
		data = this.positions[0];
		return data;
	}
	
	data = this.getSnapshot();
	data.rotation = degtorad(data.rotation);
	return data;
}

Player.prototype.getTimer = function(){
	return Math.round(this.room.deltaTime * 1000 * this.nbInputs);
}

Player.prototype.spawn = function(map){
	this.car = new Car({player:this});
	this.car.x = map.start.x;
	this.car.y = map.start.y;
	this.car.carDir = map.start.rotation;
}

Player.prototype.endRace = function(){
	if(isServer){
		if(this.time == null){
			this.time = this.getTimer();
			var changeEndState = false;
			var now = Date.now();
			//Prise en compte interval avec premier
			if(this.room.endState > now + this.room.map.maxInterval){
				this.room.endState = now + this.room.map.maxInterval;
				changeEndState = true;
			}
			for(var i in this.room.players){
				Utils.messageTo(this.room.players[i].socket, "timer", {id:this.id, time:this.time});
				if(changeEndState){
					Utils.messageTo(this.room.players[i].socket, "changeEndState", this.room.endState - now);
				}
			}
		}
	}
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
			rotation:Math.round(radtodeg(this.car.rotation)),
			nbLap:this.car.nbLap,
			lastCheckpoint:this.car.lastCheckpoint
		}
		data.skin = this.skin;
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

Player.prototype.getRankingInfo = function(){
	return {
		id:this.id,
		pseudo:this.pseudo,
		elo:this.elo,
		deltaElo:this.deltaElo,
		time:this.time,
		registered:this.registered
	};
}