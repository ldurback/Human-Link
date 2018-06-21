import express from "express";
import http from "http";
import socket_io from "socket.io";

import Controller from "./controller";
import { AddressInfo } from "net";

import { Socket } from "socket.io";

interface LiveLinkServerAddress {
    server: string;
    port: number;
}

export = class UIHost {
    private app: express.Express;
    private http: http.Server;
    private io: socket_io.Server;

    private controller: Controller;

    constructor(controller: Controller) {
        this.app = express();
        this.http = new http.Server(this.app);
        this.io = socket_io(this.http);

        this.io.on("connection", (socket: Socket) => {
            this.handleConnection(socket);
        });

        this.controller = controller;
    }

    private handleConnection(socket: Socket) {
        console.info('UIHost: a user connected');

        socket.on('disconnect', () => {
            this.handleDisconnect(socket);
        })

        socket.on('connect_to_live_server', (address: LiveLinkServerAddress) => {
            this.handleRequestConnectToLiveServer(address);
        })
    }

    private handleRequestConnectToLiveServer(address: LiveLinkServerAddress) {
        console.info("UIHost: Asking controller for new live server connction @" + address.server + ":" + address.port);
        this.controller.newLSConnection(address.server,address.port);
    }

    private handleDisconnect(socket: Socket) {
        console.info('UIHost: a user disconnected');
    }

    serve(directory_address) {
        this.app.use(express.static(directory_address));
    //    this.app.get('/', function(req, res){
    //        res.sendFile(__dirname + file_address);
    //    });
    }

    find_port_and_listen() {
        this.http.listen(0, () => {
            var address = this.http.address() as AddressInfo;

            console.info('UIHost on port ' + address.port);
        });
    }
}