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
		console.log("Error with socket " + socket.name + ": " + error);
	});

	// send welcome message
	socket.write("You are connected as " + socket.name + "\n");

	// log that client has joined
	console.log(socket.name + " has joined");

	// put the socket in the list of clients
	clients.push(socket);

	// remove the client from the list when it leaves
	socket.on('end', function() {
		clients.splice(clients.indexOf(socket),1);

		//log that the client has left
		console.log(socket.name + " has left");
	});
});

server.listen(5000);

console.log("Live Server on port 5000");