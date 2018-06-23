import * as React from 'react';
import ConnectDialog, { LiveLinkServerAddress } from "./connectDialog";

import socket from "../socket";

export default class ConnectAsClientDialog extends ConnectDialog {
    render() {
        return <div><h1>Connect to Live Server As Client</h1>
        Server <input value={this.state.server} onChange={this.handleServerChange} /> <br />
        Port <input value={this.state.port} onChange={this.handlePortChange} /> <br />
        <button id="connect" onClick={this.handleClick}>Connect</button></div>;
    }

    connect() {
        console.log("sending message to connect (as client) to live server @" + this.state.server + ":" + this.state.port);

        var address: LiveLinkServerAddress = this.state;
  
        socket.emit('connect_to_live_server_as_client', address);
    }
}