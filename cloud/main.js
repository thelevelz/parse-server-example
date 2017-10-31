
Parse.Cloud.define('hello', function (req, res) {
  res.success('Hello from Azure.');
});

Parse.Cloud.define('addUser', function (request, response) {

  Parse.Cloud.useMasterKey();

  if (!request.params.user) {
    response.error('Missing data.');
  }

  var _user = request.params.user;

  var user = new Parse.User();
  user.set('username', _user.email);
  user.set('email', _user.email);
  user.set('firstName', _user.firstName);
  if (_user.mobile) {
    user.set('mobile', _user.mobile);
  }
  user.set('password', _user.password);
  user.set('position', _user.position);
  user.set('emailVerified', true);
  if (!user.desk) {
    user.set('deskNo', _user.desk);
  }

  user.signUp(null, { useMasterKey: true }).then(function (user) {
    response.success(user);
  }, function (error) {
    response.error(error);
  });
});