import http from 'http';
import { app } from './app.js';

import createDebug from 'debug';

const debug = createDebug('W6');

const PORT = process.env.PORT || 3030;

const server = http.createServer(app);

server.on('error', (error) => {
  debug('server error: ', error.message);
});
server.on('listening', () => {
  debug('listening on port ' + PORT);
});
