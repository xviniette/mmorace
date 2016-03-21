var Drops = {
	skinsInfos:[],
	skins:{},
	cases:[],

	initSkins:function(){
		this.skins = {};
		for(var i in this.skinsInfos){
			var s = this.skinsInfos[i];
			if(!this.skins[s.chest]){
				this.skins[s.chest] = [];
			}
			this.skins[s.chest].push(s);
		}
	},
	getInitSkins:function(){
		if(this.skins[-1].length == 0){
			return null;
		}
		return this.skins[-1];
	},
	dropCommon:function(){
		if(this.skins[0].length == 0){
			return null;
		}
		return this.skins[0][random(0, this.skins[0].length)];
	},
	dropCase:function(){
		if(this.cases.length == 0){
			return null;
		}
		return this.cases[random(0, this.cases.length)];
	}
}
