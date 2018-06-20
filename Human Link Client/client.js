// load the Log library
var Log = require('log')

// set logging level
var log = new Log('info');

// load the TCP library
var net = require('net');

class Client {
    constructor() {
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
        this.socket.on("close", function () {
            log.info("Server connection closed")
        });
    }

    connect(port, server) {
        this.socket.connect(port, server, function() {
            log.info("Connected");
        });
    }
}

module.exports = Client;