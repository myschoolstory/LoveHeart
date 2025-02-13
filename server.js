import express from 'express';
import { createBareServer } from '@tomphttp/bare-server-node';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bare = createBareServer('/bare/');
const app = express();

// Serve static files
app.use(express.static(join(__dirname, 'public')));
app.use('/uv/', express.static(uvPath));

// UV middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Handle 404
app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, 'public', '404.html'));
});

const server = express();
const PORT = process.env.PORT || 3000;

server.on('request', (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`LoveHeart running on port ${PORT}`);
});
