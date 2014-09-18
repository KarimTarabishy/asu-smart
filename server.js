var express = require('express');
var app = express();
var path = require("path");


app.use(express.static(path.join(__dirname,"app","include")));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'app', 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
});


app.listen(5000);