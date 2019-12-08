import * as Express from 'express';
import * as Helment from 'helmet';
import * as Cors from 'cors';
import * as Session from 'express-session';
import * as ConnectSessionKnex from 'connect-session-knex'; // required only for sessions being stored in db
// lines will be marked with a comment and then a * if it's only for session persistence

import { timeInMs } from './utils';
import db from './data/dbConfig';
import {
  loginRouter,
  registerRouter,
  usersRouter,
} from './routes';

const server = Express();

const KnexSessionStore = ConnectSessionKnex(Session); // *
const sessionConfig: Session.SessionOptions = {
  name: 'not sure what to put here',
  secret: process.env.SESSION_SECRET || 'development secret',
  cookie: {
    maxAge: timeInMs({ days: 120 }), // longest a cookie can be valid
    secure: (process.env.NODE_ENV === 'production'), // can only be sent over https if set to true
    httpOnly: true, // if 'true' no scripts can view or modify the cookie
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({ // * everything in 'store' relates to data persistence
    knex: db,
    tablename: 'knex_sessions',
    sidfieldname: 'session_id',
    createtable: true, // makes table if it's not in the db already
    clearInterval: timeInMs({ hours: 1 }), // clears out expired sessions at a set interval
  }),
};

server.use(Helment());
server.use(Express.json());
server.use(Cors());
server.use(Session(sessionConfig)); // must come before any routes

server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);
server.use('/api/users', usersRouter);

export default server;
