import * as Express from 'express';
import * as Helment from 'helmet';

import {
  loginRouter,
  registerRouter,
  usersRouter,
} from './routes';

const server = Express();

server.use(Helment());
server.use(Express.json());

server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);
server.use('/api/users', usersRouter);

export default server;
