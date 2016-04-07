io.on('connection', function(socket){
    socket.emit("login", true);
    socket.emit("playersStats", game.getNbPlayers());

    socket.on("signin", function(data){
        Utils.onSignin(data, socket);
    });

    socket.on("login", function(data){
        Utils.onLogin(data, socket);
    });

    socket.on("msg", function(data){
        Utils.onMessage(data, socket);
    });

    socket.on("inputs", function(data){
        Utils.onInputs(data, socket);
    });

    socket.on("participate", function(data){
        Utils.onParticipate(data, socket);
    });

    socket.on("disconnect", function(){
        Utils.onDisconnect(socket);
    });
});

