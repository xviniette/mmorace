var client;
var isServer = false;
var socket;

var inputsKeyCode = {
	r:[39, 68],
	l:[37, 81, 65]
};

$(function(){
	client = new Client();

	function update(timestamp) {
		if(client){
			client.update();
		}

		requestAnimationFrame(update);
	}

	requestAnimationFrame(update);
});

