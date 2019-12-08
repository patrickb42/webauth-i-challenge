/* eslint-disable no-console */
import * as Dotenv from 'dotenv';

Dotenv.config();

// eslint-disable-next-line import/first
import server from './server';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
