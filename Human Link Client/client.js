// load the TCP library
var net = require('net');

// create a client socket to connect to server
var clientSocket = new net.Socket();

// define error handler
clientSocket.on("error", function(error) {
    console.log("Error: " + error);
});

// connect clientSocket to server
clientSocket.connect(5000, "localhost", function() {
    console.log("Connected");
});

clientSocket.on("data", function(data) {
    console.log("Received: " + data);
});

clientSocket.on("close", function () {
    console.log("Server connection closed")
});

