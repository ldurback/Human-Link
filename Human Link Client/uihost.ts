import express from "express";
import http from "http";
import socket_io from "socket.io";

import Controller from "./controller";
import { AddressInfo } from "net";

export = class UIHost {
    private app: express.Express;
    private http: http.Server;
    private io: socket_io.Server;

    private controller: Controller;

    constructor(controller) {
        this.app = express();
        this.http = new http.Server(this.app);
        this.io = socket_io(this.http);

        this.io.on("connection", (socket) => {
            console.info('UI: a user connected');

            this.registerEvents(socket);
        });

        this.controller = controller;
    }

    registerEvents(socket) {
        socket.on('disconnect', () => {
            console.info('UI: a user disconnected');
        })

        socket.on('connect_to_live_server', (data) => {
            var server = data.server;
            var port = data.port;

            console.info("Asking controller for new live server connction @" + server + ":" + port);
            this.controller.newLSConnection(server,port);
        })
    }

    serve(file_address) {
        this.app.get('/', function(req, res){
            res.sendFile(__dirname + file_address);
        });
    }

    find_port_and_listen() {
        this.http.listen(0, () => {
            var address = this.http.address() as AddressInfo;

            console.info('UI server on port ' + address.port);
        });
    }
}