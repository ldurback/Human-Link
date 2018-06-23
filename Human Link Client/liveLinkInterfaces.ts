export interface LiveServerConnection {
    name: string;
    server: string;
    port: number;

    connectToLiveServer(server: string, port: number);
}

export interface LiveLinkData {
    type: string;
}

export interface ClientNameData extends LiveLinkData {
    name: string;
}