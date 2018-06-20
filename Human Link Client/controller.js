var Log = require('log')
var log = new Log('info');

var UIHost = require('./uihost');

var LiveServerConnection = require('./liveServerConnection');

class Controller {
    constructor() {
        this.uiHost = new UIHost(this);

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