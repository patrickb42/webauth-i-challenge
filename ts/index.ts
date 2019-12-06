import * as Dotenv from 'dotenv';

import server from './server';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
