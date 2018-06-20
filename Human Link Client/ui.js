// load the Log library
var Log = require('log')

// set logging level
var log = new Log('info');

// UI class
class UI {
    constructor() {
        // create http server for UI
        this.app = require('express')();
        this.http = require('http').Server(this.app);

        // create socket for communication with ui
        this.io = require('socket.io')(this.http);

        this.app.get('/', function(req, res){
            res.sendFile(__dirname + '/ui/index.html');
        });

        this.io.on('connection', (socket) => {
            log.info('a user connected');
            socket.on('disconnect', function(){
                log.info('user disconnected');
            });
        });

        this.http.listen(0, () => {
            log.info('UI server on port ' + this.http.address().port);
        });
    }
}

module.exports = UI;