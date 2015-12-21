var Elo = {
	getK:function(elo){
		var k = 50;
		return k;
	},
	calc:function(elo1, elo2, win){
		var estimation = 1/(1+Math.pow(10, (elo2 - elo1)/400));
		return {
			elo1:win-estimation,
			elo2:-(win-estimation)
		}
	}
};