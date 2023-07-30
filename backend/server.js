const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()
app.use(express.json()); // JSON 데이터 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱
var cors = require('cors');
app.use(cors());

app.listen(8080, function () {
  console.log('listening on 8080')
}); 

app.use('/', require('./routes/user') );