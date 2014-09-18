var express = require('express');
var app = express();
var path = require("path");

var staticUrl = '/include';
var publicFolder = path.resolve(__dirname, 'app/include')//make sure you reference the right path

//serve all atatic files prefixed with '/static/*'
app.use(staticUrl, express.static(publicFolder));
app.use(staticUrl, function(req, res, next) {
    res.send(404);
});

//serve index.html for all not 'static' prefixed requests
app.all('/*', function(req, res) {
    res.sendFile('index.html', {root: path.resolve(__dirname, 'app/')});
});
app.listen(5000);