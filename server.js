const express = require('express');
const fs = require('fs');
const app = express();
const port = 3003;

const perPage = 2;

app.get('/photos', (req, res) => {
  console.log('the req is', req.query);
  const album = req.query.album;
  const pageNum = req.query.pageNum;

  console.log('Get photos from album: ', album, pageNum);

  fs.readdir(`./public/albums/${album}`, (err, files) => {
    const photoSet = files.slice((pageNum - 1) * perPage, (pageNum - 1) * perPage + perPage);
    console.log('photo set:', photoSet);
    res.send({ photos: photoSet });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
