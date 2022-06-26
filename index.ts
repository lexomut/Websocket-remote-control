import { httpServer } from './src/http_server';
import { startServer } from './src/webSocetServer/server';


const HTTP_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss_port = 8081;
try {
    startServer(wss_port);
} catch (e) {
    console.log(e.message);
}
