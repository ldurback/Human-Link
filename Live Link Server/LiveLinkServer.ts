// load the TCP Library
import * as net from "net";

interface LiveLinkSocket extends net.Socket {
    name: string;
}

export = class LiveLinkServer extends net.Server {
    private clients: Array<LiveLinkSocket> = [];
    constructor() {
        super((socket: LiveLinkSocket) => {
            // Give a name to the client
            socket.name = socket.remoteAddress + ":" + socket.remotePort;

            // put the socket in the list of clients
            this.clients.push(socket);

            // define the error handler for the socket
            socket.on("error", function (error) {
                console.error(socket.name + ": " + error);
            });

            // send identification message
            var data = {
                type: "clientName",
                name: socket.name
            };
            var jsonData = JSON.stringify(data);
            socket.write(jsonData);

            // log that client has joined
            console.info(socket.name + " has joined");

            // parse data that the server receives from the client
            socket.on("data", function(data) {

            });

            // remove the client from the list when it leaves
            socket.on("close", () => {
                this.clients.splice(this.clients.indexOf(socket),1);

                console.info(socket.name + " has left");
            });
        });
    }
}