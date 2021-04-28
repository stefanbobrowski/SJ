const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3003;

app.use(cors());

app.get('/photos', (req, res) => {
  const album = req.query.album;

  if (!Object.keys(req.query).length === 0) {
    console.log('Expected album: ', album);
  } else {
    console.log('Okay..: ', album);
    fs.readdir(`../public/albums/${album}`, (err, files) => {
      // fs.readdir(`./albums/${album}`, (err, photos) => {
      if (err) {
        console.log('READ photos ERROR: ', err);
      }

      res.send({ photos: files });
    });
  }
});

app.listen(port, () => {
  console.log(`Susie J server listening at http://localhost:${port}`);
});
