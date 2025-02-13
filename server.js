import express from 'express';
import { createServer } from 'http';
import { Server } from 'ws';
import bareServer from '@tomphttp/bare-server-node';
import wispServer from 'wisp-server-node';

const app = express();
const httpServer = createServer(app);

app.use(express.static('public'));

// Setup Bare server
bareServer.setup({
  port: 3001,
  host: 'localhost'
});

// Setup Wisp server
const wisp = wispServer({
  port: 3002,
  host: 'localhost',
  key: 'your-secret-key-here' // Change this!
});

app.listen(8080, () => {
  console.log('LoveHeart server running on port 8080');
});