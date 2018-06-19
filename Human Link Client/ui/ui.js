// load the Log library
var Log = require('log')

// set logging level
var log = new Log('info');

// create http server for UI
var uiApp = require('express')();
var uiHttp = require('http').Server(uiApp);

// create socket for communication with ui
var uiIO = require('socket.io')(uiHttp);

exports.setup = function() {
    uiApp.get('/', function(req, res){
        res.sendFile(__dirname + '/ui/index.html');
    });

    uiIO.on('connection', function(socket){
        log.info('a user connected');
        socket.on('disconnect', function(){
            log.info('user disconnected');
        });
    });

    uiHttp.listen(0, function(){
    log.info('UI server on port ' + uiHttp.address().port);
    });
}