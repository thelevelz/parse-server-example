
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
  if (user.desk) {
    user.set('deskNo', _user.desk);
  }

  user.signUp(null, { useMasterKey: true }).then(function (user) {
    response.success(user);
  }, function (error) {
    response.error(error);
  });
});

Parse.Cloud.define('updateUser', function (request, response) {
  Parse.Cloud.useMasterKey();

  if (!request.params.user || (!request.params.user.id && !request.params.id)) {
    response.error('Missing data.');
  }

  var userData = request.params.user;
  var userId = request.params.user.id || request.params.id;

  console.log(userData);

  if (userData instanceof Parse.User) {
    userData = {
      email: userData.get("email"),
      firstName: userData.get("firstName"),
      mobile: userData.get("mobile"),
      password: userData.get("password"),
      position: userData.get("position"),
      emailVerified: userData.get("emailVerified"),
      mobileVerification: userData.get("mobileVerification"),
      emailVerification: userData.get("emailVerification"),
      deskNo: String(userData.get("deskNo")),
      setupFlag: userData.get("setupFlag"),
      keyMobile: userData.get("keyMobile"),
      countryCode: userData.get("countryCode"),
      serviceId: userData.get("serviceId"),
      adminUserId: userData.get("adminUserId"),
    }
  } else {
    userData = {
      email: userData.email,
      firstName: userData.firstName,
      mobile: userData.mobile,
      password: userData.password,
      position: userData.position,
      emailVerified: userData.emailVerified,
      mobileVerification: userData.mobileVerification,
      emailVerification: userData.emailVerification,
      deskNo: String(userData.desk) || String(userData.deskNo),
      setupFlag: userData.setupFlag,
      keyMobile: userData.keyMobile,
      countryCode: userData.countryCode,
      serviceId: userData.serviceId,
      adminUserId: userData.adminUserId,
    }
  }

  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId", userId);
  query.first({
    success: function (user) {
      if (userData.email) {
        user.set('username', userData.email);
        user.set('email', userData.email);
      }
      if (userData.firstName) {
        user.set('firstName', userData.firstName);
      }
      if (userData.mobile) {
        user.set('mobile', userData.mobile);
      }
      if (userData.password) {
        user.set('password', userData.password);
      }
      if (userData.position) {
        user.set('position', userData.position);
      }
      if (userData.emailVerified !== null || userData.emailVerified !== undefined) {
        user.set('emailVerified', userData.emailVerified);
      }
      if (userData.emailVerification !== null || userData.emailVerification !== undefined) {
        user.set('emailVerification', userData.emailVerification);
      }
      if (userData.mobileVerification !== null || userData.mobileVerification !== undefined) {
        user.set('mobileVerification', userData.mobileVerification);
      }
      if (userData.deskNo) {
        user.set('deskNo', userData.deskNo);
      }
      if (userData.setupFlag) {
        user.set('setupFlag', userData.setupFlag);
      }
      if (userData.keyMobile) {
        user.set('keyMobile', userData.keyMobile);
      }
      if (userData.countryCode) {
        user.set('countryCode', userData.countryCode);
      }
      if (userData.serviceId) {
        var Service = Parse.Object.extend("Service");
        var service = new Service();
        service.set("objectId", userData.serviceId);
        user.set('serviceId', service);
      }
      if (userData.adminUserId) {
        var AdminUser = Parse.Object.extend("AdminUser");
        var adminUser = new AdminUser();
        adminUser.set("objectId", userData.adminUserId);
        user.set('adminUserId', adminUser);
      }

      // save user
      Parse.Object.saveAll(user, { useMasterKey: true }).then(function (user) {
        response.success(user);
      }, function (error) {
        response.error(error);
      });

    },
    error: function (error) {
      response.error(error);
    }
  });
});