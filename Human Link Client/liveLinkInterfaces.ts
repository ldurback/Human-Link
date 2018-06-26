import { AuthenticationData } from "./AuthenticationData";

export interface LiveServerConnection {
    server: string;
    port: number;

    connectToLiveServer(server: string, port: number);
}

export interface LiveLinkData {
    type: string;
}

// type: authentication
export interface LiveLinkAuthenticationData extends LiveLinkData, AuthenticationData {}