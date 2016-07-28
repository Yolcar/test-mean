var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var multipartyMiddlaware = multiparty();

var app = express();
var authenticationController = require('./server/controllers/authenticationController');
var profileController = require('./server/controllers/profileController');
var wasteController = require('./server/controllers/wasteController');

mongoose.connect('mongodb://localhost:27017/mean');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/uploads', express.static(__dirname + '/uploads'));

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

//Waste
app.post('/api/waste/post', wasteController.postWaste);
app.get('/api/waste/get', wasteController.getWastes);

app.listen('3000',function (){
  console.log("Transmitiendo en localhost:3000");
});
