var Car = function(json){
	this.player;
	this.map;

	this.lastCheckpoint = 0;
	this.nbLap = 0;

	this.x = 0;
	this.y = 0;

	this.speedX = 0;
	this.speedY = 0;

	//direction
	this.carDir = 0;
	this.rotation = 0;

	//Speed
	this.aSpeed = 0.45;
	this.aaspeed = 0.1;
	this.dASpeed = 0.2;
	this.maxSpeed = 13.5;
	this.initASpeed = 0.45;
	this.speedOnShow = 0;

	this.towardSpeed = 0;
	this.directSpeed = 0;

	//drift
	this.driftCoefficient = 0;
	this.driftingState = false;
	this.driftEndSpeed = this.maxSpeed * 0.2;
	this.driftStartSpeed = this.maxSpeed * 0.3;
	this.drifting = false;

	//this.friction
	this.frictionCount = 0;
	this.friction = 0.35;
	this.frictionX = 0;
	this.frictionY = 0;
	this.rollfriction = 0.1;

	//Roues
	this.wheelDir = 0;
	this.wheelDistance = 50;
	this.maxWheelAngle = (45 * Math.PI / 180);
	this.wheelRollSpeed = (1.15 * Math.PI / 180);
	this.wheelOffSpeed = this.wheelRollSpeed * 1.5;
	this.wheelBackSpeed = this.wheelRollSpeed * 2;
	this.sinWheelDir = 0;

	this.cosDir = 0;
	this.sinDir = 0;

	this.init(json);
}

Car.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}

Car.prototype.update = function(inputs){
	this.map = this.player.room.map;
	if(inputs.u){
		this.moveUp();
	}
	if(inputs.d){
		this.moveDown();
	}
	if(inputs.l){
		this.moveLeft();
	}
	if(inputs.r){
		this.moveRight();
	}
	if(!inputs.l && !inputs.r){
		this.moveStraight();
	}
	this.drifting = false;
	if(inputs.b){
		this.drifting = true;
	}

	this.slowDown();
	this.x = this.x + this.speedX;
	this.y = this.y + this.speedY;
	this.rotation = this.carDir;

	//Check checkpoint || Fin
	for(var i in this.map.checkpoints){
		var c = this.map.checkpoints[i];
		if(distance(this.x, this.y, c.x, c.y) <= c.r){

			//collision
			if(this.lastCheckpoint == c.nb - 1){
				this.lastCheckpoint = c.nb;
			}	
		}
	}

	//check finish
	if(this.map.pointInFinish(this.x, this.y)){
		if(this.lastCheckpoint == this.map.maxCheckpoint){
			this.nbLap++;
			this.lastCheckpoint = 0;
		}
		if(this.nbLap >= this.map.nbLaps){
			this.player.endRace();
		}
	}

}

Car.prototype.slowDown = function(){
	if(this.towardSpeed > 0){
		if(this.towardSpeed < this.friction){
			this.frictionCount = this.towardSpeed / this.friction * 0.9;
		}else{
			this.frictionCount = 1;
		}
		this.frictionX = -this.frictionCount * this.friction * Math.cos(this.carDir + Math.PI / 2);
		this.frictionY = -this.frictionCount * this.friction * Math.sin(this.carDir + Math.PI / 2);
	}else if(this.towardSpeed < 0){
		if(-this.towardSpeed < this.friction){
			this.frictionCount = -this.towardSpeed / this.friction * 0.9;
		}else{
			this.frictionCount = 1;
		}
		this.frictionX = this.frictionCount * this.friction * Math.cos(this.carDir + Math.PI / 2);
		this.frictionY = this.frictionCount * this.friction * Math.sin(this.carDir + Math.PI / 2);
	}else{
		this.frictionX = 0;
		this.frictionY = 0;
	}
	this.cosDir = Math.cos(this.carDir);
	this.sinDir = Math.sin(this.carDir);
	this.sinWheelDir = Math.sin(this.wheelDir);
	if(this.directSpeed > 0){
		if(this.directSpeed < this.rollfriction){
			this.frictionCount = this.directSpeed / this.rollfriction * 0.9;
		}else{
			this.frictionCount = 1;
		}
		this.rollfrictionX = -this.frictionCount * this.rollfriction * this.cosDir;
		this.rollfrictionY = -this.frictionCount * this.rollfriction * this.sinDir;
	}else if(this.directSpeed < 0){
		if(-this.directSpeed < this.rollfriction){
			this.frictionCount = -this.directSpeed / this.rollfriction * 0.9;
		}else{
			this.frictionCount = 1;
		}
		this.rollfrictionX = this.frictionCount * this.rollfriction * this.cosDir;
		this.rollfrictionY = this.frictionCount * this.rollfriction * this.sinDir;
	}else{
		this.rollfrictionX = 0;
		this.rollfrictionY = 0;
	}
	if(!this.drifting){
		if(this.directSpeed > 0){
			this.carDir = this.carDir + Math.atan2(Math.abs(this.directSpeed) * this.sinWheelDir, this.wheelDistance);
		}else{
			this.carDir = this.carDir - Math.atan2(Math.abs(this.directSpeed) * this.sinWheelDir, this.wheelDistance);
		}
	}else if(this.directSpeed > 0){
		this.carDir = this.carDir + Math.atan2(this.driftCoefficient * Math.abs(this.directSpeed) * this.sinWheelDir, this.wheelDistance);
	}
	else
	{
		this.carDir = this.carDir - Math.atan2(this.driftCoefficient * Math.abs(this.directSpeed) * this.sinWheelDir, this.wheelDistance);
	}
	this.speedX = this.speedX + (this.frictionX + this.rollfrictionX);
	this.speedY = this.speedY + (this.frictionY + this.rollfrictionY);
	var speedLength = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
	var tASpeed = this.maxSpeed - speedLength;
	if(tASpeed < 0){
		var speedOffSet = (0.5 - Math.random()) * 0.2;
		this.aSpeed = 0;
	}else if(tASpeed < this.aSpeed){
		var speedOffSet = (0.5 - Math.random()) * 0.2;
		this.aSpeed = tASpeed;
	}else{
		var speedOffSet = 0;
	}
	this.directSpeed = this.speedX * this.cosDir + this.speedY * this.sinDir;
	this.speedOnShow = this.directSpeed + speedOffSet;
	this.towardSpeed = -this.speedX * this.sinDir + this.speedY * this.cosDir;
}

Car.prototype.moveUp = function(){
	if(this.aSpeed < 0){
		this.aSpeed = this.aaspeed;
	}else{
		this.aSpeed += this.aaspeed;
		if(this.aSpeed > this.initASpeed){
			this.aSpeed = this.initASpeed;
		}
	}
	this.speedX += this.aSpeed * this.cosDir;
	this.speedY += this.aSpeed * this.sinDir;
}

Car.prototype.moveDown = function(){
	if(this.aSpeed < 0){
		this.aSpeed = this.aaspeed;
	}else{
		this.aSpeed += this.aaspeed;
		if(this.aSpeed > this.dASpeed){
			this.aSpeed = this.dASpeed;
		}
	}
	this.speedX -= this.aSpeed * this.cosDir;
	this.speedY -= this.aSpeed * this.sinDir;
}

Car.prototype.moveRight = function(){
	if(this.wheelDir < 0){
		this.wheelDir += this.wheelBackSpeed;
	}else if(this.wheelDir < this.maxWheelAngle){
		this.wheelDir += this.wheelRollSpeed;
	}
	if(this.wheelDir > this.maxWheelAngle){
		this.wheelDir = this.maxWheelAngle;
	}
}

Car.prototype.moveLeft = function(){
	if(this.wheelDir > 0){
		this.wheelDir -= this.wheelBackSpeed;
	}else if(this.wheelDir > -this.maxWheelAngle){
		this.wheelDir -= this.wheelRollSpeed;
	}
	if(this.wheelDir < -this.maxWheelAngle){
		this.wheelDir = -this.maxWheelAngle;
	}
}

Car.prototype.moveStraight = function(){
	if(this.wheelDir > 0){
		this.wheelDir -= this.wheelOffSpeed;
		if(this.wheelDir < 0){
			this.wheelDir = 0;
		}
	}else if(this.wheelDir < 0){
		this.wheelDir += this.wheelOffSpeed;
		if(this.wheelDir > 0)
		{
			this.wheelDir = 0;
		}
	}
}