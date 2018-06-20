var Log = require('log')
var log = new Log('info');

var UI = require('./ui');

var LiveServerConnection = require('./liveServerConnection');

class Controller {
    constructor() {
        this.ui = new UI(this);

        this.liveServerConnections = [];
    }

    newLiveServerConnection(server, port) {
        var lsConnection = new LiveServerConnection(this);
        lsConnection.connectToLiveServer(server, port);

        this.liveServerConnections.push(lsConnection);
    }

    liveServerConnectionClosed(lsConnection) {
        this.liveServerConnections.splice(this.liveServerConnections.indexOf(lsConnection),1);
    }
}

module.exports = Controller;