// load the TCP library
import * as net from 'net';

import Controller from './controller';

interface LiveLinkData {
    type: string;
}

interface ClientNameData extends LiveLinkData {
    name: string;
}

export = class LiveServerConnection {
    private controller: Controller;
    private socket: net.Socket;
    private name: string;
    private server: string;
    private port: number;

    constructor(controller: Controller) {
        this.controller = controller;

        // create a socket to connect to server
        this.socket = new net.Socket();

        // connect error handler
        this.socket.on("error", (error) => {this.handleError(error)});

        // connect data handler
        this.socket.on("data", (data) => {this.handleData(data)});

        // connect closing handler
        this.socket.on("close", () => {this.handleClose()});
    }

    private handleError(error: Error) {
        console.error(error);
    }

    private handleData(jsonBuffer: Buffer) {
        console.info("Received data: " + jsonBuffer);

            var data: LiveLinkData = JSON.parse(jsonBuffer.toString());
            switch (data.type) {
                case "clientName":
                    this.receiveClientName(data as ClientNameData)                    
                    break;
            }
    }

    private receiveClientName(clientNameData: ClientNameData) {
        if (this.name !== undefined) return; // only allow name to be set once

        this.name = clientNameData.name;
        console.info("Received clientName: " + clientNameData.name);

        this.controller.placeLSConnectionInList(this);
    }

    private handleClose() {
        console.info("Live Server connection closed " + this.name + "@" + this.server + ":" + this.port);

        this.controller.removeLSConnectionFromList(this);
    }

    connectToLiveServer(server: string, port: number) {
        this.socket.connect(port, server, () => {
            console.info("Connected to Live Server " + server + ":" + port);

            this.server = server;
            this.port = port;
        });
    }
}