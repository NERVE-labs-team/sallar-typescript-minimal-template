export interface GreetingFromServer {
    server_nick: string;
    count: number;
}

export interface GreetingFromClient {
    client_nick: string;
    count: number;
}