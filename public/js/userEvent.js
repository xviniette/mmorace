$(function(){
	document.body.addEventListener("keydown", function(e) {
		if($('input:focus').length == 0){
			for(var i in inputsKeyCode){
				for(var j in inputsKeyCode[i]){
					if(inputsKeyCode[i][j] == e.keyCode){
						client.keys[i] = true;
						return;
					}
				}
			}
		}
	});

	document.body.addEventListener("keyup", function(e) {
		for(var i in inputsKeyCode){
			for(var j in inputsKeyCode[i]){
				if(inputsKeyCode[i][j] == e.keyCode){
					client.keys[i] = false;
					return;
				}
			}
		}
	});
});