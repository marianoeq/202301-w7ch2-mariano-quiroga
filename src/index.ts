import http from 'http';
import { app } from './app.js';
import { dbConnect } from './db/db.connect.js';

const PORT = process.env.PORT || 3030;

const server = http.createServer(app);

dbConnect().then((mongoose) => {
  server.listen(PORT);
  console.log('Connected to DB: ' + mongoose.connection.db.databaseName);
});

server.on('error', (error) => {
  console.log('server error: ', error.message);
});
server.on('listening', () => {
  console.log('listening on port ' + PORT);
});
