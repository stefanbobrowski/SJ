const express = require('express');
const fs = require('fs');
const app = express();
const port = 3003;

app.get('/photos', (req, res) => {
  // console.log('Req: ', req.query);

  const album = req.query.album;
  const pageNum = parseInt(req.query.pageNum);
  const pageSize = parseInt(req.query.pageSize);

  // fs.readdir(`../albums/${album}`, (err, files) => {
  fs.readdir(`../public/albums/${album}`, (err, files) => {
    if (pageNum !== 0) {
      files = files.splice(2);
    }
    const photoSet = files.slice(pageNum * pageSize, pageNum * pageSize + pageSize);
    // console.log('Photo set: ', photoSet);
    res.send({ photos: photoSet });
  });
});

app.listen(port, () => {
  console.log(`Susie J server listening at http://localhost:${port}`);
});
