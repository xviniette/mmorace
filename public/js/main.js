var client;
var isServer = false;
var socket;

var inputsKeyCode = {
	r:[39],
	l:[37],
	u:[38],
	d:[40],
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
});

