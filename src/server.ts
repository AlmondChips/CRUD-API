import * as dotenv from "dotenv";
import * as http from 'http';
import { logger } from "./modules/logger";
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}


const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  res.end('Hello world!');
});

server.listen(process.env.PORT, () => {
    console.log(`Serveasd listening on port ${process.env.PORT}`);
    logger();
});

