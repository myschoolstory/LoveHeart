import { ChemicalServer } from "chemicaljs";
import express from "express";

const [app, listen] = new ChemicalServer({
  // Add configuration to bypass proxy for downloads
  bypassDownloads: true,
  downloadMimeTypes: [
    'application/octet-stream',
    'application/zip',
    'application/x-zip-compressed',
    'application/pdf',
    'application/x-msdownload',
    'application/x-apple-diskimage',
    // Add other download mime types as needed
  ]
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