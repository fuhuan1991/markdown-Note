var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(express.static('./build')); //Serves resources from public folder

var server = app.listen(8080);

console.log('server is running at port 8080');