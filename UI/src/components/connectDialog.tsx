import * as React from 'react';
import { ChangeEvent } from 'react';
import socket from "../socket";


interface ConnectDialogState {
    server: string;
    port: number;
}

export default class ConnectDialog extends React.Component<{}, ConnectDialogState> {
    constructor(props) {
        super(props);

        this.state = {
            server: '',
            port: 0
        };

        this.handleClick = this.handleClick.bind(this);
        this.handlePortChange = this.handlePortChange.bind(this);
        this.handleServerChange = this.handleServerChange.bind(this);
    }

    render() {
        return <div><h1>Connect to Live Server</h1>
        Server <input value={this.state.server} onChange={this.handleServerChange} /> <br />
        Port <input value={this.state.port} onChange={this.handlePortChange} /> <br />
        <button id="connect" onClick={this.handleClick}>Connect</button></div>;
    }

    handleServerChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            server: event.target.value
        })
    }

    handlePortChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            port: parseInt(event.target.value, 10)
        })
    }

    handleClick() {  
        console.log("sending message to connect to live server @" + this.state.server + ":" + this.state.port);
  
        socket.emit('connect_to_live_server', this.state);
    }
}