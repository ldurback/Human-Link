// load the TCP Library
import * as net from "net";

import { AuthenticationData } from "./AuthenticationData";

interface LiveLinkSocket extends net.Socket {
    name: string;
}

interface LiveLinkData {
    type: string;
}

interface ClientNameData extends LiveLinkData {
    name: string;
}

interface LiveLinkAuthenticationData extends LiveLinkData, AuthenticationData {}

interface MessageData extends LiveLinkData {
    message: string;
}

interface MessageAndSenderData extends MessageData {
    sender: string;
}

export = class LiveLinkServer extends net.Server {
    private clients: {[name: string]: LiveLinkSocket} = {};
    private owner: LiveLinkSocket;
    constructor() {
        super((socket: LiveLinkSocket) => {
            // Give a name to the client
            socket.name = socket.remoteAddress + ":" + socket.remotePort;

            // put the socket in the list of clients
            this.clients[socket.name] = socket;

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

    private handleData(socket: LiveLinkSocket, jsonBuffer: Buffer) {
        console.info("Received data: ", jsonBuffer);
        var data: LiveLinkData = JSON.parse(jsonBuffer.toString()) as LiveLinkData;
        switch (data.type) {
            case "authentication":
                this.handleAuthentication(socket, data as LiveLinkAuthenticationData);
                break;
            case "messageToOwner":
                this.handleMessageToOwner(socket, data as MessageData);
                break;
        }
    }

    private handleAuthentication(socket: LiveLinkSocket, liveLinkAuthData: LiveLinkAuthenticationData) {
        console.warn("WARNING: No Authentication Method in Place.  Owner was just asigned.")
        this.owner = socket;
    }

    private handleMessageToOwner(socket: LiveLinkSocket, messageToOwner: MessageData) {
        if (this.owner === undefined) {
            console.info("Tried to send a message to the owner, but there was no owner: ", messageToOwner);
            return;
        }

        // construct message to send to owner
        var message: MessageAndSenderData = {
            type: "messageAndSenderData",
            message: messageToOwner.message,
            sender: socket.name
        };

        this.owner.write(JSON.stringify(message));
    }

    private handleClose(socket: LiveLinkSocket) {
        delete this.clients[socket.name];

        console.info(socket.name + " has left");
    }
}