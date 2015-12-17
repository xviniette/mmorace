var Map = function(json){
	this.id;
	this.name;

	this.nbLap = 1;

	this.maxTime = 5 * 1000;	
	this.maxInterval = 20 * 1000;	

	this.width = 1024;
	this.height = 1024;


	this.track = [];
	this.checkpoints = [];
	this.finish = {
		x:0,
		y:0,
		w:0,
		h:0
	}
	/*this.shapes = {
		"track":[[[896,551],[896,488],[891,488],[890,459],[884,444],[874,432],[854,422],[839,415],[840,409],[312,144],[313,150],[264,127],[232,118],[199,117],[166,126],[144,141],[132,166],[127,190],[127,208],[120,208],[120,624],[124,625],[124,655],[129,666],[152,681],[166,680],[180,676],[199,666],[200,671],[456,544],[484,537],[515,537],[545,545],[560,552],[592,585],[705,808],[710,808],[724,838],[769,861],[791,866],[823,866],[856,858],[873,848],[884,827],[890,804],[891,785],[896,785],[896,551],[975,552],[976,850],[961,894],[920,936],[902,944],[845,959],[773,959],[713,944],[695,936],[656,896],[545,672],[538,672],[522,640],[502,630],[482,630],[434,655],[431,649],[175,776],[148,783],[108,783],[81,776],[65,769],[56,760],[47,744],[41,716],[40,196],[55,136],[80,89],[121,48],[152,32],[181,25],[236,25],[264,32],[936,368],[960,392],[968,408],[975,437],[975,553]]]
	}*/

	this.start = {
		x:920, 
		y:580,
		rotation:280
	};

	this.init(json);
}

Map.prototype.pointInFinish = function(x, y){
	if(this.finish.x <= x && this.finish.x + this.finish.w >= x && this.finish.y <= y && this.finish.h + this.finish.w >= y){
		return true;
	}
	return false;
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
		nbLap:this.nbLap,
		maxTime:this.maxTime,
		maxInterval:this.maxInterval,
		width:this.width,
		height:this.height,
		start:this.start,
		checkpoints:this.checkpoints,
		track:this.track,
		finish:this.finishs
	}
}