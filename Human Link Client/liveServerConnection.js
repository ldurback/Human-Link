var Log = require('log')
var log = new Log('info');

// load the TCP library
var net = require('net');

class LiveServerConnection {
    constructor(controller) {
        this.controller = controller;

        // create a socket to connect to server
        this.socket = new net.Socket();

        // define error handler
        this.socket.on("error", function(error) {
            log.error(error);
        });

        // define data handler
        this.socket.on("data", function(data) {
            log.info("Received: " + data);
        });

        // define handler for closing connection
        this.socket.on("close", () => {
            log.info("Live Server connection closed @" + this.server + ":" + this.port);

            this.controller.liveServerConnectionClosed(this);
        });
    }

    connectToLiveServer(server, port) {
        this.socket.connect(port, server, () => {
            log.info("Connected to Live Server " + server + ":" + port);

            this.server = server;
            this.port = port;
        });
    }
}

module.exports = LiveServerConnection;