import * as React from 'react';
import { ChangeEvent } from 'react';


export interface LiveLinkServerAddress {
    server: string;
    port: number;
}

export default abstract class ConnectDialog extends React.Component<{}, LiveLinkServerAddress> {
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
        this.connect();
    }

    abstract connect();
}