var express = require('express');
var cors = require('cors');

var app = express();
const PORT = 7777;
app.use(cors());
app.use(express.static('./build')); //Serves resources from public folder


app.get('/test', (req, res) => res.send('Welcome!'));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
