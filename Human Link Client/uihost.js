class UIHost {
    constructor(controller) {
        this.app = require('express')();
        this.http = require('http').Server(this.app);
        this.io = require('socket.io')(this.http);

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
            console.info('UI server on port ' + this.http.address().port);
        });
    }
}

module.exports = UIHost;