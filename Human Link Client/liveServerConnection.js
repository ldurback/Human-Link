// load the TCP library
var net = require('net');

class LiveServerConnection {
    constructor(controller) {
        this.controller = controller;

        // create a socket to connect to server
        this.socket = new net.Socket();

        // define error handler
        this.socket.on("error", function(error) {
            console.error(error);
        });

        // define data handler
        this.socket.on("data", (json) => {
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

module.exports = LiveServerConnection;