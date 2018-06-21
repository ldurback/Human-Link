var UIHost = require('./uihost');

var LiveServerConnection = require('./liveServerConnection');

class Controller {
    constructor() {
        this.uiHost = new UIHost(this);

        this.liveServerConnections = {};
    }

    newLSConnection(server, port) {
        var lsConnection = new LiveServerConnection(this);
        lsConnection.connectToLiveServer(server, port);
    }

    placeLSConnectionInList(lsConnection) {
        this.liveServerConnections[lsConnection.name + "@" + lsConnection.server + ":" + lsConnection.port] = lsConnection;
    }

    removeLSConnectionFromList(lsConnection) {
        delete this.liveServerConnections[lsConnection.name + "@" + lsConnection.server + ":" + lsConnection.port];
    }
}

module.exports = Controller;