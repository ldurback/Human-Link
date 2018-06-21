// load the TCP library
import * as net from 'net';

import Controller from './controller';

export = class LiveServerConnection {
    private controller: Controller;
    private socket: net.Socket;
    private name: string;
    private server: string;
    private port: string;

    constructor(controller: Controller) {
        this.controller = controller;

        // create a socket to connect to server
        this.socket = new net.Socket();

        // define error handler
        this.socket.on("error", function(error) {
            console.error(error);
        });

        // define data handler
        this.socket.on("data", (json: string) => {
            console.info("Received data: " + json);

            var data = JSON.parse(json);
            switch (data.type) {
                case "clientName":
                    if (this.name !== undefined) break; // only allow name to be set once

                    this.name = data.name;
                    console.info("Received clientName: " + data.name);

                    this.controller.placeLSConnectionInList(this);
                    break;
            }
        });

        // define handler for closing connection
        this.socket.on("close", () => {
            console.info("Live Server connection closed " + this.name + "@" + this.server + ":" + this.port);

            this.controller.removeLSConnectionFromList(this);
        });
    }

    connectToLiveServer(server, port) {
        this.socket.connect(port, server, () => {
            console.info("Connected to Live Server " + server + ":" + port);

            this.server = server;
            this.port = port;
        });
    }
}