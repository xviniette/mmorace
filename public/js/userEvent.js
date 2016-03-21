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

	var emojis = document.getElementsByClassName("emoji");
	for(var i in emojis){
		emojis[i].onclick = function(){
			var value = this.attributes["val"].value;
			socket.emit("msg", parseInt(value));
		}		
	}

	//CONNEXION
	$("#login").submit(function(e){
		e.preventDefault();
		if($("#login_password").val().length == 0){
			socket.emit("login", {"login":$("#login_login").val()});
		}else{
			socket.emit("login", {"login":$("#login_login").val(), "password":$("#login_password").val()});
		}
	});

	//Inscription
	$("#signin").submit(function(e){
		e.preventDefault();
		socket.emit("signin", {"login":$("#signin_login").val(), "password":$("#signin_password").val()});
	});

	//Participer
	$("#participate").submit(function(e){
		e.preventDefault();
		socket.emit("participate", {map:parseInt($('input[name=map]:checked', '#participate').val()), skin:parseInt($('input[name=skin]:checked', '#participate').val())});
	});

	OnResizeCalled();
	window.addEventListener("resize", OnResizeCalled, false);

});