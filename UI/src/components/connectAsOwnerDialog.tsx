import * as React from 'react';
import ConnectDialog, { LiveLinkServerAddress } from "./connectDialog";
import { AuthenticationData } from "../AuthenticationData";

import socket from "../socket";

interface LogInLiveLinkServerRequest {
    address: LiveLinkServerAddress;
    authenticationData: AuthenticationData;
}

export default class ConnectAsOwnerDialog extends ConnectDialog {
    render() {
        return <div><h1>Connect to Live Server As Owner</h1>
        Server <input value={this.state.server} onChange={this.handleServerChange} /> <br />
        Port <input value={this.state.port} onChange={this.handlePortChange} /> <br />
        <button id="connect" onClick={this.handleClick}>Connect</button></div>;
    }

    connect() {
        console.log("sending message to connect (as owner) to live server @" + this.state.server + ":" + this.state.port);

        var request: LogInLiveLinkServerRequest = {
            address: this.state,
            authenticationData: {}
        };
  
        socket.emit('connect_to_live_server_as_owner', request);
    }
}