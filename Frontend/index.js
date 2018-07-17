var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/src'));

var port = process.env.PORT || 8080;

app.listen(8080, function () {
  console.log('listening on port %d!', this.address().port);
}); 
