const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3003;

app.use(cors());

app.get('/photos', (req, res) => {
  if (!Object.keys(req.query).length === 0) {
    console.log('Expected album: ', req.query.album);
  } else {
    const album = req.query.album;

    fs.readdir(`../public/albums/${album}`, (err, files) => {
      // fs.readdir(`../albums/${album}`, (err, files) => {
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
