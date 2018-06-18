// load the Log library
var Log = require('log')

// set logging level
var log = new Log('info');

// load the TCP Library
var net = require('net');

// keep track of the clients
var clients = [];

// start a TCP server
var server = net.createServer(function(socket) {
	
	// Give a name to the client
	socket.name = socket.remoteAddress + ":" + socket.remotePort;

	// define the error handler for the socket
	socket.on("error", function (error) {
		log.error(socket.name + ": " + error);
	});

	// send welcome message
	socket.write("You are connected as " + socket.name + "\n");

	// log that client has joined
	log.info(socket.name + " has joined");

	// put the socket in the list of clients
	clients.push(socket);

	// remove the client from the list when it leaves
	socket.on('end', function() {
		clients.splice(clients.indexOf(socket),1);

		//log that the client has left
		log.info(socket.name + " has left");
	});
});

server.listen(5000);

log.info("Live Server on port 5000");