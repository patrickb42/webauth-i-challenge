/* eslint-disable no-console */
import * as Dotenv from 'dotenv';

import { normalizePort } from './utils';

Dotenv.config();

// eslint-disable-next-line import/first
import server from './server';

const PORT = normalizePort(process.env.PORT) || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
