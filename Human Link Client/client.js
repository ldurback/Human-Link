// load the Log library
var Log = require('log')

// set logging level
var log = new Log('info');

// load the TCP library
var net = require('net');

// create a client socket to connect to server
var clientSocket = new net.Socket();

// define error handler
clientSocket.on("error", function(error) {
    log.error(error);
});

// connect clientSocket to server
clientSocket.connect(5000, "localhost", function() {
    log.info("Connected");
});

clientSocket.on("data", function(data) {
    log.info("Received: " + data);
});

clientSocket.on("close", function () {
    log.info("Server connection closed")
});

