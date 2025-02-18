import { ChemicalServer } from "chemicaljs";
import express from "express";
import WebTorrent from 'webtorrent';

const [app, listen] = new ChemicalServer({
  bypassDownloads: true,
  downloadMimeTypes: [
    'application/octet-stream',
    'application/zip', 
    'application/x-zip-compressed',
    'application/pdf',
    'application/x-msdownload',
    'application/x-apple-diskimage'
  ]
});

// Initialize WebTorrent client
const client = new WebTorrent();

// Add endpoint for torrent downloads
app.post('/torrent', express.json(), (req, res) => {
  const { magnetUri } = req.body;
  
  client.add(magnetUri, (torrent) => {
    torrent.on('done', () => {
      console.log('Torrent download finished');
    });
    
    res.json({
      infoHash: torrent.infoHash,
      name: torrent.name,
      progress: torrent.progress
    });
  });
});

const port = process.env.PORT || 3000;

app.use(express.static("public", {
  index: "index.html", 
  extensions: ["html"]
}));

app.serveChemical();

listen(port, () => {
  console.log(`LoveHeart listening on port ${port}`);
});