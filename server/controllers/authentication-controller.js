var User = require('../datasets/users');

module.exports.signup = function(req, res) {
  var user = new User(req.body);
  user.save();

  res.json(req.body);
};

module.exports.login = function(req, res) {
  User.find(req.body, function (err, result) {
    if (err) {
      console.log('Error Out');
    }

    if (result && result.length === 1) {
      res.json(req.body.email);
    }
  });
};
