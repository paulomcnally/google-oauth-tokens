var express = require('express');
var request = require('request');
var app = express();

var client_id = '1056343679866-d3om13ea9ts3hboquqssjqq82uj56q7n.apps.googleusercontent.com';
var client_secret = 'Gsy9mP-tSZuC32gRuBIiaKt6';
var redirect_uri = 'http://127.0.0.1:8081/oauth2callback';

app.use(express.bodyParser());

app.get('/', function(req, res){
    res.redirect('https://accounts.google.com/o/oauth2/auth?client_id='+client_id+'&redirect_uri='+redirect_uri+'&scope=https://www.googleapis.com/auth/fusiontables&response_type=code');
});

app.get('/oauth2callback', function(req, res){

    var code = req.param('code');

    request.post('https://accounts.google.com/o/oauth2/token', {form:{"refresh_token":code,"client_id":client_id,"client_secret":client_secret,"grant_type":"authorization_code"}},function (error, response, body){
        console.log(error);
        console.log(body);
        console.log(response);
        res.send(body);
    });


});

app.listen(8081);