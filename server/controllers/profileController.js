var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');

module.exports.updatePhoto = function(req, res) {
  var file = req.files.file;
  var userId = req.body.userId;

  console.log('User ' + userId + " is submitting ", file);
  Date.prototype.yyyymmddhhmmss = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
    return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(ss);
  };

  var uploadData = new Date().yyyymmddhhmmss();

  var tempPath = file.path;
  var targetPath = path.join(__dirname, "../../uploads/" + userId + uploadData + file.name);
  var savePath = "uploads/" + userId + uploadData + file.name;

  fs.rename(tempPath, targetPath, function(err){
    if (err) {
      console.log(err);
    }
    else {
      User.findById(userId, function (err, userData) {
        if (!userData) {
          console.log('fail');
        }else {
          userData.image = savePath;
          userData.save(function (err){
            if (err) {
              console.log('failed save');
              res.json({status: 500});
            }else {
              console.log('save successful');

              res.json({status: 200});
            }
          });
        }
      });
    }

  });
};

module.exports.updateUsername = function(req, res){
  var username = req.body.username;
  var userId = req.body.userId;

  User.findById(userId, function(err, userData){
    var user = userData;
    user.username = username;

    user.save(function(err){
      if (err) {
        console.log("fail");
        res.json({status: 500});
      }else {
        console.log("success");
        res.json({status: 200});
      }
    });
  });
};

module.exports.updateBio = function(req, res){
  var bio = req.body.bio;
  var userId = req.body.userId;

  User.findById(userId, function(err, userData){
    var user = userData;
    user.bio = bio;

    user.save(function(err){
      if (err) {
        console.log("fail");
        res.json({status: 500});
      }else {
        console.log("success");
        res.json({status: 200});
      }
    });
  });
};
