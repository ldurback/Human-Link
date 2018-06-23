import UIHost from "./uihost";
import LiveServerClientConnection from './lsClientConnection';
import LiveServerOwnConnection from './lsOwnConnection';

import { AuthenticationData } from './AuthenticationData';

export = class Controller {
    uiHost: UIHost;
    private liveServerClientConnections: Array<LiveServerClientConnection>;
    private myLiveServerConnection: LiveServerOwnConnection;

    constructor() {
        this.uiHost = new UIHost(this);
        this.liveServerClientConnections = [];
    }

    newLSClientConnection(server: string, port: number) {
        var lsConnection = new LiveServerClientConnection(this);
        this.liveServerClientConnections.push(lsConnection);

        lsConnection.connectToLiveServer(server, port); 
    }

    removeLSClientConnectionFromList(lsConnection: LiveServerClientConnection) {
        this.liveServerClientConnections.splice(this.liveServerClientConnections.indexOf(lsConnection),1);
    }

    connectToOwnLS(server: string, port: number, authenticationData: AuthenticationData) {
        this.myLiveServerConnection = new LiveServerOwnConnection(this);
        
        this.myLiveServerConnection.connectToLiveServer(server, port);

        this.myLiveServerConnection.authenticateWithLiveServer(authenticationData);
    }

    deleteOwnLS() {
        delete this.myLiveServerConnection;
    }
}