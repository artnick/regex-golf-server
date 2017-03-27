const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));

const dbUrl = process.env.RG_DBURL;

MongoClient.connect(dbUrl, (err, database) => {
  if (err) return console.log(err)
  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})