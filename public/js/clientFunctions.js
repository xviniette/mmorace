function OnResizeCalled(){
	var gameDiv = $("#game");
	var gameSize = {
		x:gameDiv.width(),
		y:gameDiv.height()
	};

	var screenWidth = window.innerWidth; 
	var screenHeight = window.innerHeight; 

	gameDiv.css("top", (screenHeight/2 - gameSize.y/2)+"px");
	gameDiv.css("left", (screenWidth/2 - gameSize.x/2)+"px");

	var ratio = gameSize.x / gameSize.y;
	var screenRatio = screenWidth/screenHeight;

	if(screenRatio > ratio){
		var scale = screenHeight/gameSize.y;
	}else{
		var scale = screenWidth/gameSize.x;
	}
	gameDiv.css("transform", "scale("+scale+")");
}

function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}