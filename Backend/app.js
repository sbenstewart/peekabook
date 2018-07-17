
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var cors = require('cors');


var operations = require('./routes/operations');
var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');

app.set('port', process.env.PORT || 4300);

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cors());


if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(

    connection(mysql,{

        host: 'localhost',
        user: process.env.DATABASE_USER,
        password : process.env.DATABASE_PASS,
        port : '3306', 
        database:'Peekabook'

    },'pool')

);



app.get('/', routes.index);
app.get('/operations/getStudent', operations.getStudent);
app.get('/operations/getBook', operations.getBook);
app.post('/operations/postTransaction', operations.postTransaction);



app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
