/*
 * Documentation: https://developers.google.com/accounts/docs/OAuth2WebServer
 * Python example: http://gmaps-samples.googlecode.com/svn/trunk/fusiontables/oauth_tokens.py
 * Create you're client_id, client_secret and redirect_uri here https://code.google.com/apis/console
 * Example configuration redirect_uri: https://www.dropbox.com/s/4td0b3npmxcao8r/Screenshot%202013-10-28%2017.27.42.png
 */

var express = require('express');
var request = require('request');
var app = express();

var client_id = ''; // https://code.google.com/apis/console
var client_secret = ''; // https://code.google.com/apis/console
var redirect_uri = ''; // https://code.google.com/apis/console

app.use(express.bodyParser());

app.get('/', function(req, res){
    res.redirect('https://accounts.google.com/o/oauth2/auth?client_id='+client_id+'&redirect_uri='+redirect_uri+'&scope=https://www.googleapis.com/auth/fusiontables&response_type=code');
});

app.get('/oauth2callback', function(req, res){

    var code = req.param('code');

    request.post('https://accounts.google.com/o/oauth2/token', {form:{"code":code,"client_id":client_id,"client_secret":client_secret,"grant_type":"authorization_code","redirect_uri":redirect_uri}},function (error, response, body){
        res.send(body);
    });


});

app.listen(8081);