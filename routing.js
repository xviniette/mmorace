//ROUTING
app.get( '/user/:id' , function( req, res, next ) {
    MysqlManager.getUserById(req.params.id, function(data){
        if(data == null){
            res.json(data);
            return;
        }
        delete data.password;
        delete data.email;
        delete data.nbskintodrop;
        delete data.skindropin;
        delete data.nbcasetodrop;
        delete data.casedropin;
        res.json(data);
    });
});

app.get( '/race/:id' , function( req, res, next ) {
    MysqlManager.getRace(req.params.id, function(data){
        if(data != null){
            MysqlManager.getTemps(req.params.id, function(temps){
                data.times = temps;
                res.json(data);
            }); 
        }else{
            res.json(null);
        }
    });
});

app.get( '/map/:id/' , function( req, res, next ) {
    MysqlManager.getMap(req.params.id, function(data){
        res.json(data);
    });
});

app.get( '/mapranking/:id/:min/:max' , function( req, res, next ) {
    MysqlManager.getRankingMap(req.params.id, req.params.min, req.params.max, function(data){
        res.json(data);
    });
});

app.get( '/ranking/:type/:desc/:min/:max' , function( req, res, next ) {
    MysqlManager.getRanking(req.params.type, req.params.desc, req.params.min, req.params.max, function(data){
        res.json(data);
    });
});

app.get('/',function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get( '/*' , function( req, res, next ) {
    var file = req.params[0];
    res.sendFile( __dirname + '/public/' + file );
});

