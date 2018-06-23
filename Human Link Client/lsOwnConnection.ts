// load the TCP library
import * as net from 'net';

import Controller from './controller';
import { LiveServerConnection, LiveLinkData, ClientNameData, LiveLinkAuthenticationData } from './liveLinkInterfaces';
import { AuthenticationData } from './AuthenticationData';

export = class LiveServerOwnConnection implements LiveServerConnection {
    private controller: Controller;
    private socket: net.Socket;

    server: string;
    port: number;

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

            }
    }

    private handleClose() {
        console.info("Live Server connection closed @" + this.server + ":" + this.port);

        this.controller.deleteOwnLS();
    }

    connectToLiveServer(server: string, port: number) {
        this.socket.connect(port, server, () => {
            console.info("Connected to Live Server " + server + ":" + port);

            this.server = server;
            this.port = port;
        });
    }

    authenticateWithLiveServer(authenticationData: AuthenticationData) {
        var llAuthData: LiveLinkAuthenticationData = {
            type: "authentication"
        };

        this.socket.write(JSON.stringify(llAuthData));
    }
}