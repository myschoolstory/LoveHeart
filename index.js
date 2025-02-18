import { ChemicalServer } from "chemicaljs";
import express from "express";
import WebTorrent from 'webtorrent';

const client = new WebTorrent({
  tracker: {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302'
        ]
      }
    ]
  }
});

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

// Add endpoint for torrent downloads
app.post('/torrent', express.json(), (req, res) => {
  const { magnetUri } = req.body;
  
  client.add(magnetUri, { announceList: [] }, (torrent) => {
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