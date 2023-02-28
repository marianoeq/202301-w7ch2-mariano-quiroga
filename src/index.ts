import http from 'http';
import { app } from './app.js';
import { dbConnect } from './db/db.connect.js';
import createDebug from 'debug';

const debug = createDebug('W6');

const PORT = process.env.PORT || 3030;

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('DB:', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('error', (error) => {
  debug('server error: ', error.message);
});
server.on('listening', () => {
  debug('listening on port ' + PORT);
});
