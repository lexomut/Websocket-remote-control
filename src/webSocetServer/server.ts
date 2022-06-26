import WebSocket, { createWebSocketStream } from 'ws';
import { messageHandler } from './message-handler';

export function startServer(port:number) {
    const wsServer =  new WebSocket.Server ({port});
    wsServer.on('connection', (ws) => {
        const duplexStream= createWebSocketStream(ws,{encoding:'utf-8',decodeStrings:false});
        duplexStream.on('data',(chunk) => messageHandler(duplexStream,chunk));
        console.log('connection');
        ws.on('close', () => {
            console.log('the client has disconnected');
        });
        ws.onerror = function () {
            console.log('Some Error occurred');
        };
        process.on('SIGHUP',() => {
            console.log('SIGHUP');
        });
    });

    wsServer.on('close', () => {
        console.log('exit server');
    });
    process.once('SIGINT',() => {
        wsServer.close();
    });
    console.log(`The Server is running on port ${port}`);
}
