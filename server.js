var express = require('express');
var app = express();

//setting middleware
app.use(express.static('./build')); //Serves resources from public folder


var server = app.listen(8080);

console.log('server is running at port 8080');