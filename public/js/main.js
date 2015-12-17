var client;
var isServer = false;
var socket;

var inputsKeyCode = {
	r:[39, 68],
	l:[37, 81, 65]
};

$(function(){
	var StoragePseudo = localStorage.getItem("pseudo");
	if(StoragePseudo){
		$("#login").val(StoragePseudo)
	}
	client = new Client();

	setInterval(function(){
		if(client.room){
			client.update();
			//client.display.draw();
		}
	}, 1000/FPS);
});

