import UIHost from "./uihost";
import LiveServerConnection from './liveServerConnection';

export = class Controller {
    uiHost: UIHost;
    private liveServerConnections: {[name: string]: LiveServerConnection};

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