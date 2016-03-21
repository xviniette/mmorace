var client;
var isServer = false;
var socket;

var inputsKeyCode = {
	r:[39, 68],
	l:[37, 81, 65],
	u:[38, 90, 87],
	d:[40, 83],
	b:[32]
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

	setInterval(function(){
		if(client && client.room && client.room.startRace == null){
			client.display.mapPoll();
		}
	}, 100);
});

