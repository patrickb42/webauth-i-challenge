import * as Express from 'express';
import * as Helment from 'helmet';

// import {} from './routes';

const server = Express();

server.use(Helment());
server.use(Express.json());

// add routes here

export default server;
