var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var multipartyMiddlaware = multiparty();

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profileController');

mongoose.connect('mongodb://localhost:27017/mean');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function(req,res){
  res.sendfile('index.html');
});

//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

//Profile
app.post('/api/profile/editPhoto', multipartyMiddlaware, profileController.updatePhoto);
app.post('/api/profile/updateUsername', profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

app.listen('3000',function (){
  console.log("Transmitiendo en localhost:3000");
});
