// load the TCP Library
import * as net from "net";

interface LiveLinkSocket extends net.Socket {
    name: string;
}

interface LiveLinkData {
    type: string;
}

interface ClientNameData extends LiveLinkData {
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

            // connect the error handler for the socket
            socket.on("error", (error) => {
                this.handleError(socket, error);
            });

            // connect the data handler for the socket
            socket.on("data", (data) => {
                this.handleData(socket, data);
            });

            // connect the close handler for the socket
            socket.on("close", () => {
                this.handleClose(socket);
            });

            // construct identification message
            var idMessage: ClientNameData = {
                type: "clientName",
                name: socket.name
            };
            var jsonIDMessage = JSON.stringify(idMessage);
            socket.write(jsonIDMessage);

            // log that client has joined
            console.info(socket.name + " has joined");
        });
    }

    private handleError(socket: LiveLinkSocket, error: Error) {
        console.error(socket.name + ": " + error);
    }

    private handleData(socket: LiveLinkSocket, data: Buffer) {

    }

    private handleClose(socket: LiveLinkSocket) {
        this.clients.splice(this.clients.indexOf(socket),1);

        console.info(socket.name + " has left");
    }
}