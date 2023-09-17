'use strict';
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const data1mb = require('./data/1mb.json');


let port = Number(process?.env?.PORT) || 3000;
app.use(cors());

//Test
app.get('/', (req, res) => {
  // console.debug(req?.body);
  res.send("This is Asher's API");
});

app.get('/test/1mb', (req, res) => {
  res.json(data1mb);
})

app.post('/test', (req, res) => {
  res.send("POST is done");
})

//Static files
app.use('/static', express.static(path.join(__dirname, 'data')));

app.get('/', (req, res) => {
  // console.debug(req?.body);
  res.send("This is Asher's API");
});

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
